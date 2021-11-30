export const nextRemix = (currentRemixName, remixes, offset) => {
  if (remixes && remixes.length > 0) {
    const keys = remixes.map((obj) => obj.name);
    if (keys.length > 0) {
      if (currentRemixName !== undefined) {
        const currentRemix = keys.indexOf(currentRemixName);
        if (currentRemix >= 0) {
          const newIndex = (currentRemix + offset + keys.length) % keys.length;
          return remixes[newIndex] ? remixes[newIndex].name : null;
        }
      }
      return remixes[0].name; // shift around the array
    }
  }
  return null;
};
