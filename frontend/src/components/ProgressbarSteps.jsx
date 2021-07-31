import React from "react";
import { ProgressBar } from "react-bootstrap";

const ProgressbarSteps = ({ step }) => {
  return <ProgressBar animated now={step * 25} />;
};

export default ProgressbarSteps;
