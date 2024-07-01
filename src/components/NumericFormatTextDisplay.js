"use client";

import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import { NumericFormatProps } from "./NumericFormatCustomInput";

const NumericFormatTextDisplay = forwardRef(
  function NumericFormatCustom(props, ref) {
    return (
      <NumericFormat
        displayType="text"
        {...props}
        getInputRef={ref}
        {...NumericFormatProps}
      />
    );
  }
);

export default NumericFormatTextDisplay;
