export const hasBeenUpdated = (presentation) => {
  const { updated, created } = presentation;
  if (updated && created) {
    const updatedTime = new Date(updated).getTime();
    const createdTime = new Date(created).getTime();
    return updatedTime > createdTime;
  }
  return false;
};
