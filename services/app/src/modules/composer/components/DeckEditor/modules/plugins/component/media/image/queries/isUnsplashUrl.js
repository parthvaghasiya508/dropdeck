export const isUnsplashUrl = (url) => {
  if (url !== undefined && typeof url === 'string') {
    return url.startsWith("https://images.unsplash.com");
  }
};
