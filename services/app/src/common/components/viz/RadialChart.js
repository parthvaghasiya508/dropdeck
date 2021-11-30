import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Colors from "../../../Colors";

const styles = () => makeStyles((theme) => ({
  root: {
    "&.radial-chart": {
      position: "relative",
      display: "inline-block",
      transition: "all 0.3s ease-in",
      "&.no-progress .radial-chart-progress": {
        opacity: 0
      },
      "& .radial-chart-total": {
        opacity: 0.3
      },
      "& .radial-chart-progress": {
        transform: "rotate(270deg)",
        transformOrigin: "center",
        transition: "transform 0.6s cubic-bezier(0.58, 0.16, 0.5, 1.14)",
        transitionDelay: 0.3
      }
    },
  },
}));
const RadialChart = ({ style, radius = 50, progress = 50, strokeWidth = 25, dimension = 30, color = Colors.primary() }) => {

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  const [circleRadius, setCircleRadius] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [strokeLength, setStrokeLength] = useState(0);

  useEffect(() => {
    const r = Math.min(radius, 85);
    setCircleRadius(r);
    const c = 2 * 3.14 * r;
    setCircumference(c);
    setTimeout(() => {
      setStrokeLength(c / 100 * progress);
    });
  }, [progress]);

  return (
    <div className={`${classes.root} radial-chart ${strokeLength === 0 ? 'no-progress' : ''}`} style={style}>
      <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
        <circle
          className="radial-chart-total"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          cx="90"
          cy="90"
          r={circleRadius}
        />
        <circle
          className="radial-chart-progress"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeLength},${circumference}`}
          strokeLinecap="round"
          fill="none"
          cx="90"
          cy="90"
          r={circleRadius}
        />
      </svg>
    </div>
  );
};
export default RadialChart;
