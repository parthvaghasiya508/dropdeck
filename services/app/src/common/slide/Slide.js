export class Slide {

  static View = {
    FULL: 'full',
    LIGHTBOX: 'lightbox',
    DIRECTORY: 'directory',
    REFERENCE: 'reference',
    PDF: 'pdf',
    EDITOR: 'editor'
  };

  constructor(id, settings, path, matchingRemixes, monitor) {
    this.timeStamp = new Date().getTime(); // Important: Used to determine whether to re-render a slide component
    this.id = id;
    this.markup = [];
    this.matchingRemixes = matchingRemixes || [];
    this.path = path;
    this.settings = settings || {};
    this.remix = this.settings.remix;
    this.monitor = monitor;
    this.node = undefined;
  }

  static shallowClone(anotherSlide) {
    const newSlide = new Slide();
    newSlide.id = anotherSlide.id;
    newSlide.timeStamp = anotherSlide.timeStamp;
    newSlide.markup = [...anotherSlide.markup];
    newSlide.matchingRemixes = [...anotherSlide.matchingRemixes];
    newSlide.sourceMarkup = anotherSlide.sourceMarkup ? [...anotherSlide.sourceMarkup] : undefined;
    newSlide.path = anotherSlide.path;
    newSlide.settings = { ...anotherSlide.settings };
    newSlide.remix = anotherSlide.remix;
    newSlide.monitor = anotherSlide.monitor;
    newSlide.node = anotherSlide.node;
    return newSlide;
  }
}
