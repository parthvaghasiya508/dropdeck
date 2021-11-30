/**
 * Utility to set breakpoints on various components.
 *
 * @param preview
 * @returns {{preview: {xl: number, md: number, sm: number, xs: number, lg: number}, editor: {xl: number, md: number, sm: number, xs: number, lg: number}, slide: {xl: number, md: number, sm: number, xs: number, lg: number}}}
 * @constructor
 */
const Breakpoints = {

  maxCols: (width) => (width === "lg" ? 2 : width === "xl" ? 3 : 1),

  editor: (preview = true) => ({
    xs: 12,
    sm: preview ? 8 : 12,
    md: preview ? 7 : 12,
    lg: preview ? 5 : 12,
    xl: preview ? 4 : 12
  }),

  preview: () => ({
    xs: 12,
    sm: 4,
    md: 5,
    lg: 7,
    xl: 8
  }),

  fullWidth: () => ({
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12
  }),

  slide: (cols) => ({
    xs: cols ? 12 / cols : 12,
    sm: cols ? 12 / cols : 12,
    md: cols ? 12 / cols : 12,
    lg: cols ? 12 / cols : 6,
    xl: cols ? 12 / cols : 4
  })

};
export default Breakpoints;
