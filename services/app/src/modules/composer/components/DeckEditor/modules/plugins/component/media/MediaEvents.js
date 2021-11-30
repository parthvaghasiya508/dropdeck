export const handleMouseMoveImage = (e, ref, setReplace) => {
  const rect = ref.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x <= 70 && y >= 10 && y <= 56) {
    setReplace(true);
  }

  if (y < 10 || y > 56) {
    setReplace(false);
  }
};

export const handleMouseOutImage = (e, ref, setReplace) => {
  if (e.target === ref.current) {
    setReplace(false);
  }
};
