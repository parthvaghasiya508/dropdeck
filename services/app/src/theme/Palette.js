import { generateColorScale } from "./transforms/generateColorScale";

export const Moods = {
  Neutral: "neutral",
  Positive: "positive",
  Negative: "negative"
};

export const Origin = {
  Theme: "theme",
  Image: "image",
  Logo: "logo",
  Branding: "branding"
};

export default class Palette {

  constructor(accentColor, backgroundColor, titleColor, subtitleColor, textColor, colorScale, imagePath) {
    this.accentColor = accentColor;
    this.backgroundColor = backgroundColor;
    this.titleColor = titleColor;
    this.subtitleColor = subtitleColor;
    this.textColor = textColor;
    this.imagePath = imagePath;
    this.colorScale = colorScale;
    this._mood = Moods.Neutral;
    this._saturated = false;
    this._origin = Origin.Theme;
  }

  toDataObject = () => ({
    accentColor: this.accentColor,
    backgroundColor: this.backgroundColor,
    titleColor: this.titleColor,
    subtitleColor: this.subtitleColor,
    textColor: this.textColor,
    colorScale: this.colorScale,
    imagePath: this.imagePath,
    _mood: this._mood,
    _saturated: this._saturated,
    _origin: this._origin
  });

  static fromDataObject = (data) => {
    const palette = new Palette(data.accentColor, data.backgroundColor, data.titleColor, data.subtitleColor, data.textColor);
    palette._mood = data._mood || Moods.Neutral;
    palette._saturated = data._saturated || false;
    palette._origin = data._origin || Origin.Theme;
    return palette;
  }

  accent = () => this.accentColor;

  background = () => this.backgroundColor;

  title = () => this.titleColor;

  subtitle = () => this.subtitleColor;

  text = () => this.textColor;

  image = () => this.imagePath;

  saturated = (value) => {
    if (value !== undefined) {
      this._saturated = value;
    } else {
      return this._saturated;
    }
    return this;
  }

  mood = (value) => {
    if (value !== undefined) {
      this._mood = value;
    } else {
      return this._mood;
    }
    return this;
  }

  origin = (value) => {
    if (value !== undefined) {
      this._origin = value;
    } else {
      return this._origin;
    }
    return this;
  }

  scale = (n = 1) => generateColorScale(this.accentColor, this.textColor, n);

  id = () => `ac-${this.accent()}-bg${this.background()}-ti${this.title()}-st${this.subtitle()}-tx${this.text()}-img${this.image() || ''}`

}
