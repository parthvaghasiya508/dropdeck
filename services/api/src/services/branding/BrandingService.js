import axios from "axios";
import { Branding, Company } from '@dropdeck/schema';
import https from "https";
import ColorThief from "colorthief";
import sizeOf from "image-size";
import { write } from "tempy";
import { logger } from "../../util/logger.js";
import config from "../../config.js";
import { isDomainName } from "./isDomainName.js";

const {
  serviceUrlBase,
  accessKey
} = config.services.brandfetch;

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0)
    .toUpperCase() + s.slice(1);
};

export const BrandingService = {

  get: (id) => Branding.findById(id)
    .exec(null),

  update: (id, data) => Branding.findByIdAndUpdate(id, { $set: { ...data } }, { new: true }),

  analyzeFile: async (file, skipColor = false) => new Promise((resolve, reject) => {
    const analyze = async () => {
      const logoData = {};

      try {
        const size = sizeOf(file);
        logoData.width = size.width;
        logoData.height = size.height;
      } catch (e) {
        logger.error(e);
      }

      if (!skipColor && !file.endsWith(".svg")) {
        try {
          await ColorThief.getPalette(file, 2)
            .then((palette) => {
              logoData.whiteOnTransparent = palette === null;
            });
        } catch (e) {
          logger.error(e);
        }
      } else {
        logoData.whiteOnTransparent = null;
      }

      resolve(logoData);
    };
    analyze();
  }),

  analyzeUrl: async (url, ext, skipColor) => new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      write.task(response, async (tempFile) => {
        resolve(BrandingService.analyzeFile(tempFile, skipColor));
      }, { extension: ext || "png" });
    });
    request.on("error", (error) => {
      reject(error);
    });
    request.end();
  }),

  harvestLogo: async (query, res) => {
    let domain = query.toLowerCase();
    if (query && !isDomainName(query)) {
      // Not a valid domain name -- look for a match.
      const t0 = new Date().getTime();
      await BrandingService.search(query)
        .then((response) => {
          const t1 = new Date().getTime();
          logger.trace(`Searching for logos took ${t1 - t0} ms`);
          const suggestions = response.data;
          if (suggestions && suggestions.length > 0) {
            domain = suggestions[0].domain;
            logger.debug(`Query ${query} matches domain ${domain}`);
          }
        })
        .catch((e) => {
          logger.error(e);
        });
    }

    Branding.findOne({ domain: domain.toLowerCase() })
      .exec()
      .catch((e) => logger.error(e))
      .then((storedBranding) => {
        if (storedBranding && storedBranding.logo) {
          // Already have branding for this entity
          res.send(storedBranding);
        } else {
          // Start harvesting...
          logger.debug(`Harvesting logo for: ${domain}`);
          const urls = [
            `${serviceUrlBase}/color`,
            `${serviceUrlBase}/logo`,
          ];
          Promise.all(urls.map((url) => axios({
            method: 'POST',
            url,
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': accessKey,
            },
            data: JSON.stringify({ domain })
          })
            .then((json) => {
              if (json.status === 200 && json.data.statusCode === 200) {
                return json.data.response;
              }
            })
            .catch((e) => {
              const { response } = e;
              if (response && (response.status === 404 || response.status === 422)) {
                logger.error(`No match for ${url}`);
              } else {
                logger.error(`Error code ${response?.status} when fetching logo for ${url}`);
              }
            })))
            .then(async (responses) => {
              const branding = {
                domain,
                palette: {}
              };
              let gotData = false;
              for (let i = 0; i < responses.length; i++) {
                const data = responses[i];
                if (data) {
                  if (data.logo) {
                    gotData = true;
                    branding.logo = {
                      image: data.logo.image,
                      validated: data.logo.safe,
                      svg: data.logo.svg,
                      whiteOnTransparent: undefined
                    };
                  }
                  if (data.icon && data.icon.image) {
                    gotData = true;
                    branding.icon = {
                      image: data.icon.image,
                      svg: data.icon.svg
                    };
                  }

                  // Colours
                  if (data.filtered) {
                    gotData = true;
                    // Color API payload
                    branding.colors = {
                      accent: data.filtered.vibrant,
                      light: data.filtered.light,
                      dark: data.filtered.dark
                    };
                  }
                  if (data.suggested) {
                    branding.colors.suggestions = data.suggested;
                  }
                }
              }

              if (!gotData) {
                logger.debug(`Found no branding for domain ${domain}`);
                res.sendStatus(404);
                return;
              }

              if (branding.logo && branding.logo.image) {
                await BrandingService.analyzeUrl(branding.logo.image, "png")
                  .then((logoData) => {
                    branding.logo = { ...branding.logo, ...logoData };
                  })
                  .catch((error) => logger.error(error));
              }

              if (branding.icon && branding.icon.image) {
                await BrandingService.analyzeUrl(branding.icon.image, "jpg")
                  .then((logoData) => {
                    branding.icon = { ...branding.icon, ...logoData };
                  })
                  .catch((error) => logger.error(error));
              }

              const brandingDocument = await Branding.findOneAndUpdate({ domain: domain.toLowerCase() }, branding, {
                upsert: true,
                new: true
              });
              await brandingDocument.save();
              res.json(branding);
            })
            .catch((e) => {
              logger.error(e);
              res.sendStatus(404);
              return res;
            });
        }
      });
  },

  /**
   * Get information about a given domain. If already exists and augmented by Brandfetch we return
   * from database. If just exists as domain but not augmented we harvest all details.
   */
  harvestBranding: async (domain) => {
    const storedCompany = await Company.findOne({ domain: domain.toLowerCase() })
      .populate("branding")
      .exec()
      .catch((e) => logger.error(e));
    if (storedCompany && storedCompany.augmented) {
      // Already have branding for this entity
      logger.debug(`Already have branding for ${domain}`);
      return storedCompany;
    }

    // Start harvesting...
    logger.info(`Harvesting company information about: ${domain}`);
    const urls = [
      `${serviceUrlBase}/logo`,
      `${serviceUrlBase}/color`,
      `${serviceUrlBase}/font`,
      `${serviceUrlBase}/company`
    ];

    return Promise.all(urls.map((url) => axios({
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': accessKey,
      },
      data: JSON.stringify({ domain })
    })
      .then((json) => {
        if (json.status === 200 && json.data.statusCode === 200) {
          return json.data.response;
        }
        return null;
      })
      .catch((e) => {
        const { response } = e;
        if (response && response.status === 404) {
          logger.error(`No match for ${url}`);
        } else {
          logger.error(response);
        }
      })))
      .then(async (data) => {
        const company = { domain: domain.toLowerCase() };
        const branding = { domain: domain.toLowerCase() };
        logger.info(`Found a branding match for domain ${domain}:`);
        logger.trace(data);
        for (let i = 0; i < data.length; i++) {
          const payload = data[i];
          if (payload) {
            logger.debug(payload);
            if (payload.logo) {
              // Logo API payload
              branding.logo = {
                image: payload.logo.image,
                validated: payload.logo.safe,
                svg: payload.logo.svg,
                bgColor: undefined,
                whiteOnTransparent: undefined
              };
            }
            if (payload.icon && payload.icon.image) {
              branding.icon = {
                image: payload.icon.image,
                svg: payload.icon.svg,
                bgColor: undefined,
                whiteOnTransparent: undefined
              };
            }
            if (payload.filtered) {
              // Color API payload
              branding.colors = {
                accent: payload.filtered.vibrant || payload.filtered.dark || "#000000",
                light: payload.filtered.light || "#cccccc",
                dark: payload.filtered.dark || "#222222"
              };
              branding.colors.suggestions = payload.filtered.suggested;
            }
            if (payload.title || payload.paragraph) {
              // Font API payload
              branding.fonts = {
                title: {
                  name: payload.title?.font || payload.paragraph?.font,
                  provider: null
                },
                text: {
                  name: payload.paragraph?.font || payload.title?.font,
                  provider: null
                }
              };
            }
            if (payload.hasOwnProperty("name")) {
              // Company API payload
              company.name = payload.name;
              company.description = payload.description;
              company.language = payload.language;
              company.social = {};
              company.social.youtube = payload.youtube.url;
              company.social.facebook = payload.facebook.url;
              company.social.instagram = payload.instagram.url;
              company.social.linkedin = payload.linkedin.url;
              company.social.crunchbase = payload.crunchbase.url;
              company.social.twitter = payload.twitter.url;
              company.industries = payload.industry;
              company.location = payload.location;
              company.keywords = payload?.keywords?.split(",").map((keyword) => keyword.toString().trim());
              company.revenue = payload.revenue;
              company.employees = payload.employees;
              company.email = payload.email;

              branding.banner = { image: payload.banner };

              if (company.industries) {
                const categories = new Set();
                Object.values(company.industries).forEach((industry) => {
                  if (industry.score > 0.5) {
                    categories.add(industry.label.split("/")[0]);
                  }
                });
                company.categories = Array.from(categories);
              }
            }
          }
        }

        if (branding.logo && branding.logo.image) {
          await BrandingService.analyzeUrl(branding.logo.image, "png")
            .then((logoData) => {
              branding.logo = { ...branding.logo, ...logoData };
            })
            .catch((error) => logger.error(error));
        }

        if (branding.icon && branding.icon.image) {
          await BrandingService.analyzeUrl(branding.icon.image, "jpg")
            .then((logoData) => {
              branding.icon = { ...branding.icon, ...logoData };
            })
            .catch((error) => logger.error(error));
        }

        if (branding.banner && branding.banner.image) {
          const url = branding.banner.image;
          const extension = url.split('.').pop().trim();
          await BrandingService.analyzeUrl(url, extension, true)
            .then((bannerData) => {
              branding.banner = { ...branding.banner, ...bannerData };
            })
            .catch((error) => logger.error(error));
        }

        if (!branding.logo && branding.icon) {
          branding.logo = { ...branding.icon };
        } else if (branding.logo && !branding.icon) {
          branding.icon = { ...branding.logo };
        }

        const brandingDocument = await Branding.findOneAndUpdate({ domain: domain.toLowerCase() }, branding, { upsert: true, new: true });
        await brandingDocument.save();

        const companyDocument = await Company.findOneAndUpdate({ domain: domain.toLowerCase() }, { ...company, branding: brandingDocument._id, augmented: true }, { upsert: true, new: true });
        await companyDocument.save();

        logger.debug("Done updating database");
        return {
          ...company,
          branding
        };
      });
  },

  /**
   * Search for companies.
   *
   * @param query search query
   */
  search: async (query) => {
    const url = `${config.services.brandfetch.suggestions.endpoint}?${config.services.brandfetch.suggestions.queryParameter}=${query}`;
    return axios.get(url);
  }
};
