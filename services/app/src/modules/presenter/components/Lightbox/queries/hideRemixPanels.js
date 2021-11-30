export const hideRemixPanels = (_, event) => {
  const elements = document.getElementsByClassName('remix');
  event.preventDefault();
  if (elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
  }
};
