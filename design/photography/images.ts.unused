/**
 * Article photography ships at two widths (see optimize-images.mjs): the name
 * in the data is the large one, and the same name with `-sm` is the 800w copy.
 *
 * `responsiveImage` hands the browser both so a 370px grid card downloads the
 * small file instead of the full-bleed one. Pass `sizes` describing the slot the
 * image actually occupies, otherwise the browser assumes full viewport width and
 * the srcset saves nothing.
 */

export const smallVariant = (src: string) => src.replace(/(\.\w+)$/, "-sm$1");

export const responsiveImage = (src: string) => ({
  src,
  srcSet: `${smallVariant(src)} 800w, ${src} 1600w`,
});
