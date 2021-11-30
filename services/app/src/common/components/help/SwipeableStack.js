import React, { useCallback } from "react";
import 'swiper/swiper.scss';
import { makeStyles } from "@material-ui/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SwipeableViews from "react-swipeable-views";
import uuid from "react-uuid";
import { userSelectStyles } from "../../util/StyleHelpers";

const styles = () => makeStyles({
  root: {
    backgroundColor: "unset",
    '& button': {
      opacity: '0.75',
      transform: 'scale(0.9)',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        opacity: '1',
        transform: 'scale(1)',
      },
    },
    '& .MuiMobileStepper-dots': {
      transform: 'scale(0.8)',
      padding: '4px 8px',
      borderRadius: '16px',
      background: ' rgba(0, 0, 0, 0.1)',
    },
  }
}, { meta: 'SwipeableStack' });

const SwipeableStack = ({ content }) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = content.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  content = content.map((c) => React.cloneElement(c, { key: uuid() }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SwipeableViews
        style={{
          ...userSelectStyles,
          flexGrow: 1,
          height: '100%',
        }}
        axis="x"
        onChangeIndex={handleStepChange}
        index={activeStep}>
        {content}
      </SwipeableViews>
      <MobileStepper
        className={classes.root}
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          boxSizing: 'border-box',
          padding: '0.65em 1em',
        }}
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={(
          <IconButton size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            <KeyboardArrowRight/>
          </IconButton>
        )}
        backButton={(
          <IconButton size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft/>
          </IconButton>
        )}/>
    </div>
  );
};
export default SwipeableStack;
