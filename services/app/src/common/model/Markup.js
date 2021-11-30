export class Markup {

  static Renderer = {
    HTML: 'HTML',
    REACT: 'REACT',
  };

  constructor(type, content, path, data, renderer) {
    this.type = type;
    this.content = content;
    this.path = path;
    this.data = data;
    this.renderer = renderer !== undefined ? renderer : Markup.Renderer.HTML;
  }

}
