export const hashForTheme = (theme) => {
  if (theme.component) {
    theme = theme.component;
  }
  return (theme ? theme.id : null);
};
