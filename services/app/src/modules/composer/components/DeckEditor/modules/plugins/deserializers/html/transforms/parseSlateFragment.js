export const parseSlateFragment = (data) => {
  const slateFragmentEncoded = data.getData('application/x-slate-fragment');
  if (slateFragmentEncoded !== undefined && slateFragmentEncoded !== null && slateFragmentEncoded.length > 0) {
    const json = decodeURIComponent(atob(slateFragmentEncoded));
    if (json) {
      return JSON.parse(json);
    }
  }
  return undefined;
};
