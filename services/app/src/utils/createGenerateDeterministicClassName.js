import { createGenerateClassName } from "@material-ui/styles";
import { logger } from "../common/util/logger";

/**
 * Returns a function which generates deterministic class names, if the `deterministic` flag is turned on.
 */
export default function createGenerateDeterministicClassName(options = {}) {
  const { seed = '' } = options;
  const seedPrefix = seed === '' ? '' : `${seed}-`;
  let ruleCounter = 0;

  const getNextCounterId = () => {
    ruleCounter += 1;
    if (process.env.NODE_ENV !== 'production') {
      if (ruleCounter >= 1e10) {
        logger.warn(
          [
            'Material-UI: You might have a memory leak.',
            'The ruleCounter is not supposed to grow that much.',
          ].join(''),
        );
      }
    }
    return ruleCounter;
  };

  const delegateGenerateClassName = createGenerateClassName(options);
  return (rule, styleSheet) => {
    const { name, deterministic } = styleSheet.options;

    // Is a global static MUI style?
    if (name && name.indexOf('Mui') === 0) {
      const className = delegateGenerateClassName(rule, styleSheet);
      logger.trace(`Generating styles for ${className}`);
      return className;
    }

    // if (process.env.NODE_ENV === 'production') {
    //   return deterministic ? `${seedPrefix}${productionPrefix}` : `${seedPrefix}${productionPrefix}${getNextCounterId(deterministic)}`;
    // }

    const suffix = deterministic ? `${rule.key}` : `${rule.key}-${getNextCounterId(deterministic)}`;

    // Help with debuggability.
    if (styleSheet.options.classNamePrefix) {
      const className = `${seedPrefix}${styleSheet.options.classNamePrefix}-${suffix}`;
      logger.trace(`Generating styles for ${className}`);
      return className;
    }

    const className = `${seedPrefix}${suffix}`;
    logger.trace(`Generating styles for ${className}`);
    return className;

  };
}
