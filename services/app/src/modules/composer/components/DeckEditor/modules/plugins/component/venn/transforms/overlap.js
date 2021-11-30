export const overlap = (sets) => {
  const overlaps = [];
  for (let i = 0; i < sets.length; i++) {
    const a = sets[i];
    for (let j = i + 1; j < sets.length; j++) {
      const b = sets[j];
      const aLabel = a.sets[0];
      const bLabel = b.sets[0];
      if (aLabel !== bLabel) {
        const weight = Math.min(1, Math.min(a.size, b.size) / 2);
        overlaps.push({ sets: [aLabel, bLabel], size: weight });
      }
    }
  }
  return overlaps;
};
