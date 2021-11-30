import React from "react";

const BROWSER_FONTS = ["Abadi MT Condensed Light", "Aharoni", "Aharoni Bold", "Aldhabi", "AlternateGothic2 BT", "Andale Mono", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Apple Chancery", "Arabic Typesetting", "Arial", "Arial Black", "Arial narrow", "Arial Nova", "Arial Rounded MT Bold", "Arnoldboecklin", "Avanta Garde", "Bahnschrift", "Bahnschrift Light", "Bahnschrift SemiBold", "Bahnschrift SemiLight", "Baskerville", "Batang", "BatangChe", "Big Caslon", "BIZ UDGothic", "BIZ UDMincho Medium", "Blippo", "Bodoni MT", "Book Antiqua", "Book Antiqua", "Bookman", "Bradley Hand", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Brush Script Std", "Brushstroke", "Calibri", "Calibri Light", "Calisto MT", "Cambodian", "Cambria", "Cambria Math", "Candara", "Century Gothic", "Chalkduster", "Cherokee", "Comic Sans", "Comic Sans MS", "Consolas", "Constantia", "Copperplate", "Copperplate Gothic Light", "Copperplate Gothic Bold", "Corbel", "Cordia New", "CordiaUPC", "Coronetscript", "Courier", "Courier New", "DaunPenh", "David", "DengXian", "DFKai-SB", "Didot", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "FangSong", "Florence", "Franklin Gothic Medium", "FrankRuehl", "FreesiaUPC", "Futara", "Gabriola", "Gadugi", "Garamond", "Gautami", "Geneva", "Georgia", "Georgia Pro", "Gill Sans", "Gill Sans Nova", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Hebrew", "Hoefler Text", "HoloLens MDL2 Assets", "Impact", "Ink Free", "IrisUPC", "Iskoola Pota", "Japanese", "JasmineUPC", "Javanese Text", "Jazz LET", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "KodchiangUPC", "Kokila", "Korean", "Lao", "Lao UI", "Latha", "Leelawadee", "Leelawadee UI", "Leelawadee UI Semilight", "Levenim MT", "LilyUPC", "Lucida Bright", "Lucida Console", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lucidatypewriter", "Luminari", "Malgun Gothic", "Malgun Gothic Semilight", "Mangal", "Marker Felt", "Marlett", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft JhengHei UI", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft YaHei UI", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Miriam", "Monaco", "Mongolian Baiti", "MoolBoran", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS UI Gothic", "MV Boli", "Myanmar Text", "Narkisim", "Neue Haas Grotesk Text Pro", "New Century Schoolbook", "News Gothic MT", "Nirmala UI", "No automatic language associations", "Noto", "NSimSun", "Nyala", "Oldtown", "Optima", "Palatino", "Palatino Linotype", "papyrus", "Parkavenue", "Perpetua", "Plantagenet Cherokee", "PMingLiU", "Raavi", "Rockwell", "Rockwell Extra Bold", "Rockwell Nova", "Rockwell Nova Cond", "Rockwell Nova Extra Bold", "Rod", "Sakkal Majalla", "Sanskrit Text", "Shonar Bangla", "Shruti", "SimHei", "SimKai", "Simplified Arabic", "Simplified Chinese", "SimSun", "SimSun-ExtB", "Sitka", "Snell Roundhan", "Stencil Std", "Sylfaen", "Symbol", "Tahoma", "Thai", "Times New Roman", "Traditional Arabic", "Traditional Chinese", "Trattatello", "Trebuchet MS", "Tunga", "UD Digi Kyokasho", "UD Digi KyoKasho NK-R", "UD Digi KyoKasho NP-R", "UD Digi KyoKasho N-R", "Urdu Typesetting", "URW Chancery", "Utsaah", "Vani", "Verdana", "Verdana Pro", "Vijaya", "Vrinda", "Webdings", "Westminster", "Wingdings", "Yu Gothic", "Yu Gothic UI", "Yu Mincho", "Zapf Chancery"];

/**
 * Font Providers.
 *
 * @type {{Dropdeck: string, Google: string, Default: string}}
 */
export const FontProviders = {
  Default: "default",
  Dropdeck: "dropdeck",
  Google: "fonts.google.com"
};

/**
 * Get a URL for a font name and a provider.
 *
 * @param fontName
 * @param provider
 * @param weights as varargs
 * @returns {string|null}
 */
export const buildFontUrl = (fontName, provider, ...weights) => {
  switch (provider) {
    case FontProviders.Google: {
      return `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, "+")}:wght@${weights.length > 0 ? weights.join(";") : 400}&display=auto`;
    }
    default:
      return null;
  }
};

/**
 * Check if a font is valid, including default browser fonts and if applicable a list of other ones.
 *
 * @param font
 * @param repositoryFonts
 * @returns {boolean}
 */
export const validFont = (font, repositoryFonts = []) => font && [...BROWSER_FONTS, ...repositoryFonts].some((f) => f.toLowerCase() === font.toLowerCase());

/**
 * Create link elements for fonts.
 *
 * @param fonts
 * @returns {JSX.Element}
 */
export const createLinkElements = (fonts) => {
  const titleFontUrl = fonts.title && buildFontUrl(fonts.title.name, fonts.title.provider, 400, 700, 900);
  const textFontUrl = fonts.text && buildFontUrl(fonts.text.name, fonts.text.provider, 400, 600);
  return (
    <>
      {titleFontUrl ? <link key={`font-title-${fonts.title.name}`} href={titleFontUrl} rel="stylesheet"/> : null }
      {textFontUrl ? <link key={`font-text-${fonts.text.name}`} href={textFontUrl} rel="stylesheet"/> : null }
    </>
  );
};
