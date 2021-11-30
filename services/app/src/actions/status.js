export const ACTION_SHOW_PREVIEW = 'SHOW_PREVIEW';

/**
 * Toggle whether to show the preview lightbox.
 *
 * @param show
 * @returns {{show: *, type: string}}
 */
export function showPreview(show) {
  return {
    type: ACTION_SHOW_PREVIEW,
    show,
  };
}
