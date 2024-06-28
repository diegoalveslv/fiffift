import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";

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
        thousandSeparator="."
        decimalSeparator=","
        allowNegative={false}
        decimalScale={2}
        valueIsNumericString
        fixedDecimalScale={true}
        prefix="R$"
      />
    );
  }
);

export default NumericFormatCustomInput;
