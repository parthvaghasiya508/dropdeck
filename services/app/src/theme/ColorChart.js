const getElementAt = (arr, index) => (arr.length > index ? arr[index] : arr[arr.length - 1]);

export default class ColorChart {

  constructor(accentColors, backgroundColors, titleColors, textColors) {
    this.accentColors = Array.isArray(accentColors) ? accentColors : [accentColors];
    this.backgroundColors = Array.isArray(backgroundColors) ? backgroundColors : [backgroundColors];
    this.titleColors = Array.isArray(titleColors) ? titleColors : [titleColors];
    this.textColors = Array.isArray(textColors) ? textColors : [textColors];
  }

  accent = (index = 0) => getElementAt(this.accentColors, index);

  background = (index = 0) => getElementAt(this.backgroundColors, index);

  title = (index = 0) => getElementAt(this.titleColors, index);

  text = (index = 0) => getElementAt(this.textColors, index);

}
