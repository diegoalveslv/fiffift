"use client";

import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

export const NumericFormatProps = {
  thousandSeparator: ".",
  decimalSeparator: ",",
  allowNegative: false,
  decimalScale: 2,
  valueIsNumericString: true,
  fixedDecimalScale: true,
  prefix: "R$",
};

const NumericFormatCustomInput = forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue,
            },
          });
        }}
        {...NumericFormatProps}
      />
    );
  }
);

export default NumericFormatCustomInput;
