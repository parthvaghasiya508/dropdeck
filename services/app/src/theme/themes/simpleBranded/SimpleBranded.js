import Simple from "../simple/Simple";
import { getPalettes } from "../simple/components/palettes";
import { fallbackGridRemix } from "../../../common/remix/rules/textImage/fallbackGrid/fallbackGrid";
import { fallbackGridOverride } from "./remixes/fallbackGridOverride";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { imagesQuadAspect } from "../../../common/remix/rules/images/imagesQuadAspect/imagesQuadAspect";
import { imagesQuadAspectOverride } from "./remixes/imagesQuadAspectOverride";
import { imageFullBleedCaptionRemix } from "../../../common/remix/rules/images/imageFullBleedCaption/imageFullBleedCaption";
import { imageFullBleedCaptionOverride } from "./remixes/imageFullBleedCaptionOverride";
import { imagesMagazine3Remix } from "../../../common/remix/rules/images/imagesMagazine3/imagesMagazine3";
import { imagesMagazine3Override } from "./remixes/imagesMagazine3Override";
import { imagesMagazine4Remix } from "../../../common/remix/rules/images/imagesMagazine4/imagesMagazine4";
import { imagesMagazine4Override } from "./remixes/imagesMagazine4Override";
import { imagesText5050FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed"; //
import { imagesText5050FullBleedOverride } from "./remixes/imagesText5050FullBleedOverride"; //
import { textImages2575FullBleedRemix } from "../../../common/remix/rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { textImages2575FullBleedOverride } from "./remixes/textImages2575FullBleedOverride";
import { imagesWindowedRemix } from "../../../common/remix/rules/images/imagesWindowed/imagesWindowed";
import { imagesWindowedOverride } from "./remixes/imagesWindowedOverride";
import { listTextUpwardRemix } from "../../../common/remix/rules/lists/listTextUpward/listTextUpward";
import { listTextUpwardOverride } from "./remixes/listTextUpwardOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { videoFullScreenRemix } from "../../../common/remix/rules/videos/videoFullScreen/videoFullScreen";
import { videoFullScreenOverride } from "./remixes/videoFullScreenOverride";
import { videoFullScreenCaptionRemix } from "../../../common/remix/rules/videos/videoFullScreenCaption/videoFullScreenCaption";
import { videoFullScreenCaptionOverride } from "./remixes/videoFullScreenCaptionOverride";
import { imageH1Text1005050FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/imageH1Text1005050FullBleed/imageH1Text1005050FullBleed";
import { imageH1text1005050FullBleedOverride } from "./remixes/imageH1text1005050FullBleedOverride";
import { h1TextImage5050100FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic1/h1TextImage5050100FullBleed/h1TextImage5050100FullBleed";
import { h1TextImage5050100FullBleedOverride } from "./remixes/h1TextImage5050100FullBleedOverride";
import { boxOutTextRightRemix } from "../../../common/remix/rules/containedCover/containedCover";
import { boxoutTextOverride } from "./remixes/boxoutTextOverride";
import { imageLogoText5050FullBleedRemix } from "../../../common/remix/rules/logos/imageLogoText5050FullBleed/imageLogoText5050FullBleed";
import { imageLogoText5050FullBleedOverride } from "./remixes/imageLogoText5050FullBleedOverride";
import { imageLogoText2575FullBleedRemix } from "../../../common/remix/rules/logos/imageLogoText2575FullBleed/imageLogoText2575FullBleed";
import { imageLogoText2575FullBleedOverride } from "./remixes/imageLogoText2575FullBleedOverride";
import { imageText1005050FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic2/imageText1005050FullBleed/imageText1005050FullBleed";
import { imageText1005050FullBleedOverride } from "./remixes/imageText1005050FullBleedOverride";
import { textImage5050100FullBleedRemix } from "../../../common/remix/rules/textImageCover/tic2/textImage5050100FullBleed/textImage5050100FullBleed";
import { textImage5050100FullBleedOverride } from "./remixes/textImage5050100FullBleedOverride";

export const SIMPLE_BRANDED_THEME_ID = 'clear_branded';

export default class SimpleBranded extends Simple {

  constructor() {
    super(SIMPLE_BRANDED_THEME_ID, getPalettes(), "Simple and Elegant", true);

    const { override } = this;

    // -----------------------------------------------------------
    // Theme Specific Remix Overrides
    // -----------------------------------------------------------

    // list remixes
    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listTextUpwardRemix).with(listTextUpwardOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);

    // text/image remixes
    override(imageFullBleedCaptionRemix).with(imageFullBleedCaptionOverride);
    override(imageH1Text1005050FullBleedRemix).with(imageH1text1005050FullBleedOverride);
    override(h1TextImage5050100FullBleedRemix).with(h1TextImage5050100FullBleedOverride);   
    override(boxOutTextRightRemix).with(boxoutTextOverride);
    override(imagesText5050FullBleedRemix).with(imagesText5050FullBleedOverride); // *
    override(textImages2575FullBleedRemix).with(textImages2575FullBleedOverride);
    override(imageText1005050FullBleedRemix).with(imageText1005050FullBleedOverride);
    override(textImage5050100FullBleedRemix).with(textImage5050100FullBleedOverride);

    // image remixes
    override(imagesMagazine3Remix).with(imagesMagazine3Override);
    override(imagesMagazine4Remix).with(imagesMagazine4Override);
    override(imagesQuadAspect).with(imagesQuadAspectOverride);
    override(imagesWindowedRemix).with(imagesWindowedOverride);

    // grid image layouts
    override(fallbackGridRemix).with(fallbackGridOverride);

    // logo layouts
    override(imageLogoText5050FullBleedRemix).with(imageLogoText5050FullBleedOverride);
    override(imageLogoText2575FullBleedRemix).with(imageLogoText2575FullBleedOverride);

    // video remixes
    override(videoFullScreenRemix).with(videoFullScreenOverride);
    override(videoFullScreenCaptionRemix).with(videoFullScreenCaptionOverride);
  }

  // -----------------------------------------------------------
  // Branding
  // -----------------------------------------------------------

  _getLogo = () => {
    if (this.branding.icon && (this.branding.icon.svg || this.branding.icon.image)) {
      return this.branding.icon;
    }

    return this.branding.logo;
  }

  _getLogoSize = () => {
    const logo = this._getLogo();

    return {
      height: logo.height,
      width: logo.width
    };
  };

  _getSizeCss = () => {
    const size = this._getLogoSize();
    const css = {};

    if (size?.width > 0 && size?.height > 0) {
      css.paddingTop = `calc(${size.height / size.width} * 100%)`;
      if (size.height > size.width) {
        css.width = '1.1em';
      } else if (size.width > size.height) {
        css.width = '2.25em';
      } else {
        css.width = '1.5em';
      }
    } else {
      css.width = "2.25em";
      css.height = "1.1em";
      css.paddingTop = 0;
    }

    return css;
  }

  css() {
    const css = super.css();

    // Branding
    css.theme["& .deck-logo-container"] = {
      position: "absolute",
      bottom: '1.2em',
      right: '1.2em',
      zIndex: 3,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: '-0.25em',
        bottom: '-0.25em',
        left: '-0.25em',
        right: '-0.25em',
        zIndex: -1,
        background: this._getLogo()?.bgColor ? `${this._getLogo().bgColor} !important` : null, 
        borderRadius: '0.075em',
      },
    };
    css.theme["& .deck-logo-container-inner"] = {
      zIndex: 4,
      display: "block",
      overflow: 'hidden',
      height: 0,
      padding: 0,
      backgroundImage: `url(${this._getLogo().svg || this._getLogo().image })`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom right",
      backgroundSize: "contain",
      ...this._getSizeCss()
    };
    
    return css;
  }

}
