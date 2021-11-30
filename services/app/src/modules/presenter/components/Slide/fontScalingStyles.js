import { makeStyles } from "@material-ui/core";
import { MAX_SCALING, MIN_SCALING } from "./scalingLimits";

const maximumScaling = 10 * (MAX_SCALING - MIN_SCALING);

const scalingNumberKey = (index) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(index)) {
    return "scaling-none";
  }
  switch (index) {
    case 0:
      return "scaling-none";
    case maximumScaling:
      return "scaling-max";
    default:
      return `scaling-${index}`;
  }
};

/**
 * Generate a set of relative up-scaling for headings as a list of standard class names, corresponding to discrete
 * scaling categories. Each scaling step takes the base font size down by 1/MAX_SCALING ~ 3% and we have about 20 steps
 * (10 * (MAX_SCALING - MIN_SCALING) - 1) so that the most we can scale down is for a font size of
 * MIN_SCALING/MAX_SCALING = 40% of the unscaled value.
 *
 * To ensure that headings are not too small as we scale down the base font size, we add relative sizing multipliers for
 * H1 and H2 elements that are > 100% of the calculated font size. The formula we use is as follows: Assume s is the chosen
 * scaling factor, where MIN_SCALING <= s <= MAX_SCALING. This results in a font size that is a ratio of
 *
 *   x = s/MAX_SCALING
 *
 * of the unmodified font size. As noted above, the maximum amount of scaling we get is MIN_SCALING/MAX_SCALING = 0.4,
 * which results in a font that is 40% of its unmodified value. To weight against this down scaling for headings, we
 * calculate an upscaling factor of
 *
 *   1 / x^y
 *
 * where y = 0.5 for H1 and y = 0.25 for H2. Since 0 < x <= 1 we know that x <= x^y <= 1 for y < 1. The final font size
 * of the headings calculated by combining the base downscaling with the heading upscaling is then
 *
 *   x * (1/x^y) = x^{1-y} >= x,
 *
 * when 0 < x <= 1 and y < 1. Also note that x^{1-y} > x^{1-y'} when 1 > y > y'.
 *
 * @returns {(props?: any) => ClassNameMap<string>}
 */
export const fontScalingStyles = () => makeStyles(() => {
  const fontScales = {};
  const lowerBound = Math.round(MIN_SCALING * 10);
  const upperBound = Math.round(MAX_SCALING * 10);
  for (let i = lowerBound; i < upperBound; i++) {
    const scalingFactor = i / 10;
    const proportionalScaling = scalingFactor / MAX_SCALING;
    const key = `& .${fontScalingClassName(scalingFactor)}`;

    // Since proportionalScaling is < 1 these figures will be > 1 -- that is,
    // we want headings to be scaled down proportionally less than normal text,
    // when we start downscaling.
    const h1Proportional = 1 / (proportionalScaling ** 0.5); // x^0.5
    const h2Proportional = 1 / (proportionalScaling ** 0.25); // x^0.25

    fontScales[key] = {
      '& .container-heading-one': {
        fontSize: `${Math.round(h1Proportional * 100)}%`,
      },
      '& .container-heading-two': {
        fontSize: `${Math.round(h2Proportional * 100)}%`,
      },
    };
  }
  const styles = {
    scales: fontScales,
  };
  return styles;
}, { deterministic: true, meta: 'Font sizing scales' });

export const fontScalingClassName = (scalingFactor, remix) => {
  if (scalingFactor > MAX_SCALING) {
    scalingFactor = MAX_SCALING;
  }
  if (scalingFactor < MIN_SCALING) {
    scalingFactor = MIN_SCALING;
  }

  // Numbers start from 0:
  const scalingNumber = Math.round(10 * (MAX_SCALING - scalingFactor));
  const key = scalingNumberKey(scalingNumber);
  if (remix && remix.uniformFontScaling) {
    return `${key}-uniform`;
  }
  return key;
};
