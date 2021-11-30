import { RemixEngine } from "./RemixEngine";
import { fallbackGridRemix } from "./rules/textImage/fallbackGrid/fallbackGrid";
import { textDefaultRemix } from "./rules/text/textDefault/textDefault";
import { textLongformRemix } from "./rules/text/textLongform/textLongform";
import { textParaColsRemix } from "./rules/text/textParaCols/textParaCols";
import { textHeadingColsRemix } from "./rules/text/textHeadingCols/textHeadingCols";
import { textBlockbusterRemix } from "./rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterLeftRemix } from "./rules/text/textBlockBusterLeft/textBlockbusterLeft";
import { textSuperTitleRemix } from "./rules/text/textSuperTitle/textSuperTitle";
import { textCodeColumnsRemix } from "./rules/text/textCodeColumns/textCodeColumns";
import { textCodeRowsRemix } from "./rules/text/textCodeRows/textCodeRows";
import { textMathColumnsRemix } from "./rules/text/textMathColumns/textMathColumns";
import { textMathRowsRemix } from "./rules/text/textMathRows/textMathRows";
import { headingParagraphUpwardRemix } from "./rules/text/headingParagraphUpward/headingParagraphUpward";
import { textChartColumnRemix } from "./rules/charts/textChartColumn/textChartColumns";
import { quoteSimpleImageRemix } from "./rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { quoteParaColsRemix } from "./rules/blockQuotes/quoteParaCols/quoteParaCols";
import { clustersFullPanelRemix } from "./rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersPanelLandscapeRemix } from "./rules/clusters/clustersPanelLandscape/clustersPanelLandscape";
import { clustersPanelFixedImageRemix } from "./rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersQuoteRoundedImageRemix } from "./rules/clusters/clustersQuoteRoundImage/clustersQuoteRoundImage";
import { clustersRoundedImageRemix } from "./rules/clusters/clustersRoundedImage/clustersRoundedImage";
import { clustersTextFixedImageRemix } from "./rules/clusters/clustersTextFixedImage/clustersTextFixedImage";
import { clustersTextFixedImageAspectRemix } from "./rules/clusters/clustersTextFixedImageAspect/clustersTextFixedImageAspect";
import { clustersText5050Remix } from "./rules/clusters/clustersText5050/clustersText5050";
import { listSplitRemix } from "./rules/lists/listSplit/listSplit";
import { listSiblingRemix } from "./rules/lists/listSibling/listSibling";
import { listTextUpwardRemix } from "./rules/lists/listTextUpward/listTextUpward";
import { listUnorderedPanelsRemix } from "./rules/lists/listUnorderedPanels/listUnorderedPanels";
import { olBoldNumberRemix } from "./rules/lists/olBoldNumber/olBoldNumber";
import { listShortformRemix } from "./rules/lists/listShortform/listShortform";
import { textListCenteredRemix } from "./rules/lists/textListCentered/textListCentered";
import { textListPanelsRemix } from "./rules/lists/textListPanels/textListPanels";
import { imageAspectRemix } from "./rules/images/imageAspect/imageAspect";
import { imageWindowedRemix } from "./rules/images/imageWindowed/imageWindowed";
import { imageFullBleedRemix } from "./rules/images/imageFullBleed/imageFullBleed";
import { imageFullBleedCaptionRemix } from "./rules/images/imageFullBleedCaption/imageFullBleedCaption";
import { imageFullBleedTextGradientRemix } from "./rules/images/imageFullBleedTextGradient/imageFullBleedTextGradientRemix";
import { imagesWindowedRemix } from "./rules/images/imagesWindowed/imagesWindowed";
import { imagesAspectRemix } from "./rules/images/imagesAspect/imagesAspect";
import { imagesFullBleedRemix } from "./rules/images/imagesFullBleed/imagesFullBleed";
import { imagesQuadAspect } from "./rules/images/imagesQuadAspect/imagesQuadAspect";
import { imagesQuadWindowedRemix } from "./rules/images/imagesQuadWindowed/imagesQuadWindowedRemix";
import { imagesQuadFullBleed } from "./rules/images/imagesQuadFullBleed/imagesQuadFullBleed";
import { imagesMagazine4Remix } from "./rules/images/imagesMagazine4/imagesMagazine4";
import { imagesMagazine3Remix } from "./rules/images/imagesMagazine3/imagesMagazine3";
import { boxOutTextLeftRemix, boxOutTextRightRemix } from "./rules/containedCover/containedCover";
import { textLogoImage5050FullBleedRemix } from "./rules/logos/textLogoImage5050FullBleed/textLogoImage5050FullBleed";
import { logosBorderedGridRemix } from "./rules/logos/logosBorderedGrid/logosBorderedGrid";
import { logosImage5050FullBleedRemix } from "./rules/logos/logosImage5050FullBleed/logosImage5050FullBleed";
import { logosImage7525FullBleedRemix } from "./rules/logos/logosImage7525FullBleed/logosImage7525FullBleed";
import { logosOpenGridRemix } from "./rules/logos/logosOpenGrid/logosOpenGrid";
import { logoTextImage5050FullBleedRemix } from "./rules/logos/logoTextImage5050FullBleed/logoTextImage5050FullBleed";
import { logoTextImage2575FullBleedRemix } from "./rules/logos/logoTextImage2575FullBleed/logoTextImage2575FullBleed";
import { imageLogoText5050FullBleedRemix } from "./rules/logos/imageLogoText5050FullBleed/imageLogoText5050FullBleed";
import { imageLogoText2575FullBleedRemix } from "./rules/logos/imageLogoText2575FullBleed/imageLogoText2575FullBleed";
import { textLogosImage5050FullBleedRemix } from "./rules/logos/textLogosImage5050FullBleed/textLogosImage5050FullBleed";
import { textLogosImage7525FullBleedRemix } from "./rules/logos/textLogosImage7525FullBleed/textLogosImage7525FullBleed";
import { imagesText5050FullBleedRemix } from "./rules/textImage/fullBleed/50-50/imagesText5050FullBleed/imagesText5050FullBleed";
import { textImage5050AspectRemix } from "./rules/textImage/textImage5050Aspect/textImage5050Aspect";
import { textImages5050FullBleedRemix } from "./rules/textImage/fullBleed/50-50/textImages5050FullBleed/textImages5050FullBleed";
import { textQuote5050FullBleedRemix } from "./rules/textImage/textQuote5050FullBleed/textQuote5050FullBleed";
import { videoFullScreenRemix } from "./rules/videos/videoFullScreen/videoFullScreen";
import { videoFullScreenCaptionRemix } from "./rules/videos/videoFullScreenCaption/videoFullScreenCaption";
import { videoImageRemix } from "./rules/videos/videoImage/videoImage";
import { videoTextRemix } from "./rules/videos/videoText/videoText";
import { imageH1Text1005050FullBleedRemix, } from "./rules/textImageCover/tic1/imageH1Text1005050FullBleed/imageH1Text1005050FullBleed";
import { textImages2575FullBleedRemix } from "./rules/textImage/fullBleed/25-75/textImages2575FullBleed/textImages2575FullBleed";
import { imagesText2575FullBleedRemix } from "./rules/textImage/fullBleed/25-75/imagesText2575FullBleed/imagesText2575FullBleed";
import { h1TextImage5050100FullBleedRemix } from "./rules/textImageCover/tic1/h1TextImage5050100FullBleed/h1TextImage5050100FullBleed";
import { textImage5050100FullBleedRemix } from "./rules/textImageCover/tic2/textImage5050100FullBleed/textImage5050100FullBleed";
import { imageText1005050FullBleedRemix } from "./rules/textImageCover/tic2/imageText1005050FullBleed/imageText1005050FullBleed";
import { coverSimpleRemix } from "./rules/covers/coverSimple/coverSimple";
import { tableChartDefaultRemix } from "./rules/charts/tableChartDefault/tableChartDefault";
import { tableChart5050Remix } from "./rules/charts/tableChart5050/tableChart5050";
import { tableChart2575Remix } from "./rules/charts/tableChart2575/tableChart2575";
import { textImagesWideImgFullBleedRemix } from "./rules/textImage/fullBleed/wideImg/textImagesWideImgFullBleed/textImagesWideImgFullBleed";
import { imagesTextWideImgFullBleedRemix } from "./rules/textImage/fullBleed/wideImg/imagesTextWideImgFullBleed/imagesTextWideImgFullBleed";

const RemixFactory = () => {

  const { instance } = RemixEngine;
  instance.init();

  const remixes = [

    // --- Fallback ---
    fallbackGridRemix,

    // --- Covers ---
    coverSimpleRemix,

    // --- Text ---
    // textDefaultRemix,
    textLongformRemix,
    textParaColsRemix,
    textHeadingColsRemix,
    headingParagraphUpwardRemix,
    textCodeColumnsRemix,
    textCodeRowsRemix,
    textMathColumnsRemix,
    textMathRowsRemix,
    textBlockbusterRemix,
    textBlockbusterLeftRemix,
    textSuperTitleRemix,

    // --- Charts + Tables  ---
    textChartColumnRemix,
    tableChartDefaultRemix,
    tableChart5050Remix,
    tableChart2575Remix,

    // --- Quotes ---
    quoteSimpleImageRemix,
    quoteParaColsRemix,

    // --- Clusters ---
    clustersPanelFixedImageRemix,
    clustersQuoteRoundedImageRemix,
    clustersRoundedImageRemix,
    clustersTextFixedImageRemix,
    clustersTextFixedImageAspectRemix,
    clustersText5050Remix,
    clustersFullPanelRemix,
    clustersPanelLandscapeRemix,

    // --- Lists ---
    listSplitRemix,
    listSiblingRemix,
    listTextUpwardRemix,
    listUnorderedPanelsRemix,
    olBoldNumberRemix,
    listShortformRemix,
    textListCenteredRemix,
    textListPanelsRemix,

    // --- Images ---
    imageFullBleedRemix,
    imageFullBleedCaptionRemix,
    imageWindowedRemix,
    imageAspectRemix,
    imagesWindowedRemix,
    imagesAspectRemix,
    imagesFullBleedRemix,
    imagesMagazine3Remix,
    imagesQuadAspect,
    imagesQuadWindowedRemix,
    imagesQuadFullBleed,
    imagesMagazine4Remix,

    // --- Contained cover ---
    boxOutTextLeftRemix,
    boxOutTextRightRemix,

    // --- Logos ---
    logosBorderedGridRemix,
    logosImage5050FullBleedRemix,
    logosImage7525FullBleedRemix,
    logosOpenGridRemix,
    logoTextImage5050FullBleedRemix,
    logoTextImage2575FullBleedRemix,
    imageLogoText5050FullBleedRemix,
    imageLogoText2575FullBleedRemix,
    textLogosImage5050FullBleedRemix,
    textLogosImage7525FullBleedRemix,
    textLogoImage5050FullBleedRemix,

    // -- Text + image ---

    //  Primary Remixes:
    //
    //  ti1:   50t/50i full bleed images (up to 4 stacked)                                      (Boost to 1st place)
    //  ti2:   50t/50i aspect ratio maintained single image                                     (Boost to 2nd place)
    //  ti3:   50t/50i full bleed image - 4 x images fill image area inside 2x2 formation       (COMMENTED OUT)
    //  ti4:   25i/75t full bleed single image (additional images stack)                        (Boost to 3rd place)
    textImages5050FullBleedRemix, // ti1
    imagesText5050FullBleedRemix, // ti1 (reversed)
    textImage5050AspectRemix, // ti2
    textImages2575FullBleedRemix, // ti4
    imagesText2575FullBleedRemix, // ti4
    imageFullBleedTextGradientRemix, // i4
    textImagesWideImgFullBleedRemix,
    imagesTextWideImgFullBleedRemix,

    //  Secondary Remixes:
    //
    //  ti5:   30t/30i/30t lead central image, additional images as satellites. Titles Left, other text right.     (COMMENTED OUT)
    //  ti6:   30t/30i/30t centered image column (up to 8 stacked). Titles left, other text right.                 (COMMENTED OUT)
    //  ti7:   As ti1 but headings positioned over image, with darkened background                                 (COMMENTED OUT)
    //  ti8:   50t/50i full bleed image with quote - first image rounded and allied to quote, subsequent images stack in 5050 container
    textQuote5050FullBleedRemix,

    // --- Videos ---
    videoFullScreenRemix,
    videoFullScreenCaptionRemix,
    videoImageRemix,
    videoTextRemix,

    // --- Text cover ---
    h1TextImage5050100FullBleedRemix,
    imageH1Text1005050FullBleedRemix,
    imageText1005050FullBleedRemix,
    textImage5050100FullBleedRemix,

  ];

  // Register all the remixes
  remixes.forEach((remix) => {
    let fallback = false;
    do {
      instance.register(remix, fallback);
      remix = remix.next();
      fallback = true;
    } while (remix !== undefined);
  });

};

export default RemixFactory;
