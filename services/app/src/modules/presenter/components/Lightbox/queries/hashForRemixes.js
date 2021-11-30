export const hashForRemixes = (remixes) => {
  if (!remixes || !remixes.length) {
    return null;
  }
  return remixes.map((remix) => remix.name).sort().join();
};
