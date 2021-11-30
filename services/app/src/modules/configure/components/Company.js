import { CircularProgress } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiHost } from "../../../App";
import Dropdeck from "../../../common/api/sdk/Dropdeck";
import { useUpdateBranding } from "../../../common/api/sdk/hooks/BrandingHooks";
import Label from "../../../common/components/controls/Label";
import ChooseFonts from "../../../common/components/theme/ChooseFonts";
import ColorPicker from "../../../common/components/theme/ColorPicker";
import LogoEditor from "../../../common/components/theme/LogoEditor";
import { logger } from "../../../common/util/logger";
import { MIMETypes } from "../../../common/util/MimeTypes";
import { config } from "../../../config";

const CompanyConfiguration = ({ user }) => {

  let timeout;
  const saveProgress = (value) => {
    if (timeout) clearTimeout(timeout);

    setProgress(value);
    if (value === 100) {
      setProgressText("Saved");
      setProgress(100);
      timeout = setTimeout(() => {
        setProgress(0);
        setProgressText("");
      }, 2000);
    } else if (value === 0) {
      setProgress(0);
      setProgressText("");
    } else {
      setProgress(value);
      setProgressText("Saving...");
    }
  };

  const [branding, setBranding] = useState();
  const [updateBranding, { branding: updatedBranding }] = useUpdateBranding(saveProgress);

  const theme = useTheme();

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [logoColorType, setLogoColorType] = useState("");
  const [iconColorType, setIconColorType] = useState("");

  useEffect(() => {
    if (user && user.company && user.company?.branding[0]) {
      Dropdeck.Branding.byId(user.company?.branding[0])
        .then((payload) => {
          if (payload.data) {
            const branding = payload.data;

            setBranding(branding);

            Object.keys(branding.colors).forEach((colorType) => {
              if (branding.logo && branding.logo.bgColor === branding.colors[colorType]) {
                setLogoColorType(colorType);
              }

              if (branding.icon && branding.icon.bgColor === branding.colors[colorType]) {
                setIconColorType(colorType);
              }
            });
          }
        });
    }
  }, [user, updatedBranding]);

  const onSelectTitle = (font, provider) => {
    setProgress(1);
    updateBranding(branding._id, { fonts: { ...branding.fonts, title: { name: font, provider } } });
  };

  const onSelectText = (font, provider) => {
    setProgress(1);
    updateBranding(branding._id, { fonts: { ...branding.fonts, text: { name: font, provider } } });
  };

  const onChangeBrandingColors = (changedColors) => {
    if (branding) {
      setProgress(1);
      const updatedBranding = { 
        colors: { 
          accent: changedColors.accent, 
          dark: changedColors.dark, 
          light: changedColors.light 
        } 
      };

      if (logoColorType && branding && branding.logo) {
        updatedBranding.logo = {
          ...branding.logo,
          bgColor: changedColors[logoColorType]
        };
      }

      if (iconColorType && branding && branding.icon) {
        updatedBranding.icon = {
          ...branding.icon,
          bgColor: changedColors[iconColorType]
        };
      }

      updateBranding(branding._id, updatedBranding);
    }
  };

  const uploadLogoOrIcon = async (branding, logoFile, type, mimeType) => {
    const data = new FormData();
    data.append("files", logoFile);
    return axios.post(`${apiHost()}/branding/${branding._id}/logos`, data);
  };

  const _createLogoIconObject = (existingObject, mimeType, payload) => ({
    ...existingObject,
    ...payload.data.metadata,
    bgColor: payload.data.metadata.whiteOnTransparent ? branding?.colors?.accent : null,
    image: mimeType !== MIMETypes.SVG ? config.api.host + payload.data.filePath : null,
    svg: mimeType === MIMETypes.SVG ? config.api.host + payload.data.filePath : null
  });

  const onChangePrimaryLogo = async (logoType, logoImage, logoFile, mimeType) => {
    logger.debug("Updating Primary Logo...");
    setProgress(1);
    uploadLogoOrIcon(branding, logoFile, logoType, mimeType)
      .then((payload) => {
        updateBranding(branding._id, { logo: _createLogoIconObject(branding.logo, mimeType, payload) });
        logger.debug("Primary Logo updated.");
      });
  };

  const onChangePrimaryLogoBackground = (color, colorType) => {
    logger.debug(`Updating Primary Logo background color: ${color}`);
    setProgress(1);
    setLogoColorType(colorType);
    updateBranding(branding._id, { logo: { ...branding.logo, bgColor: color } });
  };

  const onChangeIcon = async (logoType, logoImage, logoFile, mimeType) => {
    logger.debug("Updating Icon...");
    setProgress(1);
    uploadLogoOrIcon(branding, logoFile, logoType, mimeType)
      .then((payload) => {
        updateBranding(branding._id, { icon: _createLogoIconObject(branding.icon, mimeType, payload) });
        logger.debug("Icon updated.");
      });
  };

  const onChangeIconBackground = (color, colorType) => {
    logger.debug(`Updating Icon background color: ${color}`);
    setProgress(1);
    setIconColorType(colorType);
    updateBranding(branding._id, { icon: { ...branding.icon, bgColor: color } });
  };

  return (
    <div>

      <div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={9} style={{ margin: '0 auto', }}>
            <Grid container spacing={2}>
              {/* Page Title */}
              <Grid item xs={12}>
                <Label variant="h2" style={{ textAlign: 'center' }}>Your Brand</Label>
              </Grid>
              {/* Logo */}
              <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                <Label variant="h4" style={{ textAlign: 'left', fontWeight: 'bold', margin: '20px 20px 12px 20px' }}>Brand Logos</Label>
                <LogoEditor backgroundColor={branding?.logo?.bgColor} setLogoBackgroundColor={onChangePrimaryLogoBackground} height={branding?.logo && branding?.logo.height} width={branding?.logo && branding?.logo.width} logo={(branding?.logo && branding?.logo.svg) || (branding?.logo && branding?.logo.image) || (branding?.logo && branding?.logo.svg) || (branding?.logo && branding?.logo.image)} notFound={!branding?.logo || !branding?.logo.image} colors={branding?.colors} isWhiteOnTransparent={branding?.logo?.whiteOnTransparent} onChangeLogo={onChangePrimaryLogo} transparent/>
                <LogoEditor backgroundColor={branding?.icon?.bgColor} setLogoBackgroundColor={onChangeIconBackground} height={branding?.icon && branding?.icon.height} width={branding?.icon && branding?.icon.width} logo={(branding?.icon && branding?.icon.svg) || (branding?.icon && branding?.icon.image) || (branding?.icon && branding?.icon.svg) || (branding?.icon && branding?.icon.image)} notFound={!branding?.icon || !branding?.icon.image} colors={branding?.colors} isWhiteOnTransparent={branding?.icon?.whiteOnTransparent} onChangeLogo={onChangeIcon}/>
              </Grid>
              {/* Typography, Colours */}
              <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                <Label variant="h4" style={{ textAlign: 'left', fontWeight: 'bold', margin: '20px 20px 12px 20px' }}>Brand Typography</Label>
                <ChooseFonts defaultFonts={branding?.fonts} fonts={branding?.fonts} onSelectTitle={onSelectTitle} onSelectText={onSelectText}/>
                <Label variant="h4" style={{ textAlign: 'left', fontWeight: 'bold', margin: '20px 20px 12px 20px' }}>Brand Colors</Label>
                <ColorPicker 
                  colors={branding?.colors} 
                  onChangeBrandingColors={onChangeBrandingColors} 
                />
              </Grid>
              {/* Fixed Spinner */}
              <Grid item xs={12}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", position: "fixed", height: 0, bottom: 0, left: 0, right: 0, }}>
                  {progress !== 0 && (
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: -60,
                      right: 20,
                      width: 98,
                      padding: '8px',
                      backgroundColor: theme.dark() ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.035)",
                      borderRadius: '3px',
                    }}>
                      <CircularProgress variant="determinate" value={progress} size="1.4em" style={{ color: '#00c030' }} />
                      <span style={{ color: '#00c030', fontSize: "0.9em", marginLeft: 6 }}>{progressText}</span>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

    </div>
  );
};
export default CompanyConfiguration;
