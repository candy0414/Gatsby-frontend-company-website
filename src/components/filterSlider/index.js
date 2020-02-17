import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { fontSize } from "@material-ui/system";

import "./_filterSlider.scss";
const MySlider = withStyles({
  root: {
    color: "#ffffff",
    height: 7,
    padding: "0"
  },
  thumb: {
    height: 10,
    width: 10,
    marginTop: -3,
    marginLeft: -5,
    backgroundColor: "#fff",
    border: "1px solid #fff"
  },
  active: {},
  valueLabel: {
    left: "calc(-50% - 8px)",
    top: 15,
    "& *": {
      background: "transparent",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 400,
      fontFamily: "DINPro-Regular"
    }
  },
  track: {
    height: 4
  },
  rail: {
    color: "#e8d5a1",
    opacity: 0.41,
    height: 4,
    borderRadius: 4
  }
})(Slider);

const FilterSlider = ({ start, end, min, max, onChange, step }) => {
  return (
    <div className="filter-slider-container">
      <MySlider
        onChange={onChange}
        defaultValue={[start, end]}
        valueLabelDisplay="on"
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default FilterSlider;
