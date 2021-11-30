export const goBackOrReload = (reload, history, metrics = () => {}) => (e) => {
  const { referrer } = document;
  metrics.close();
  if (referrer !== undefined && referrer.indexOf(window.location.host) !== -1) {
    e.preventDefault();
    document.querySelector("html").style.overflow = null;
    history.goBack();
  } else if (reload !== undefined) {
    reload();
  }
};
