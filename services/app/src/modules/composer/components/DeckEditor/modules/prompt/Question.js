class Question {
  constructor({ label, renderElement, placeholder, onKeyDown }) {
    this.label = label;
    this.renderElement = renderElement;
    this.onKeyDown = onKeyDown;
    this.placeholder = placeholder;
  }
}

export const input = (label, placeholder) => new Question({ label, placeholder });

export const component = ({ renderElement, onKeyDown }) => new Question({ renderElement, onKeyDown });
