import { NumericFormatProps } from "@/components/NumericFormatCustomInput";
import { TableCell, TableRow, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

export class ExpensesSummary {
  constructor(incomeIdealDivision, expensesAverage) {
    this.incomeIdealDivision = incomeIdealDivision;
    this.essentialsExpenses = expensesAverage.filter(
      (expense) => expense.type === "ESSENTIALS"
    );
    this.investmentExpenses = expensesAverage.filter(
      (expense) => expense.type === "INVESTMENT"
    );
    this.leisureExpenses = expensesAverage.filter(
      (expense) => expense.type === "LEISURE"
    );
  }

  makeHeaders() {
    return [
      {
        id: "essentials",
        header: "Essentials 50%",
        subtitle: (
          <NumericFormat
            value={this.incomeIdealDivision.essentials}
            displayType="text"
            {...NumericFormatProps}
          />
        ),
      },
      {
        id: "investment",
        header: "Investment 15%",
        subtitle: (
          <NumericFormat
            value={this.incomeIdealDivision.investment}
            displayType="text"
            {...NumericFormatProps}
          />
        ),
      },
      {
        id: "leisure",
        header: "Leisure 35%",
        subtitle: (
          <NumericFormat
            value={this.incomeIdealDivision.leisure}
            displayType="text"
            {...NumericFormatProps}
          />
        ),
      },
    ];
  }

  makeExpensesTableRows({ StyledTableCell }) {
    const maxRows = Math.max(
      this.essentialsExpenses.length,
      this.investmentExpenses.length,
      this.leisureExpenses.length
    );

    const rows = [];
    for (let i = 0; i < maxRows; i++) {
      const essentialsExpense = this.essentialsExpenses[i];
      const investmentExpense = this.investmentExpenses[i];
      const leisureExpense = this.leisureExpenses[i];

      const cells = (
        <>
          <StyledTableCell>{essentialsExpense?.description}</StyledTableCell>
          <TableCell>
            <NumericFormat
              value={essentialsExpense?.averageAmount}
              displayType="text"
              {...NumericFormatProps}
            />
          </TableCell>
          <TableCell>{investmentExpense?.description}</TableCell>
          <TableCell>
            <NumericFormat
              value={investmentExpense?.averageAmount}
              displayType="text"
              {...NumericFormatProps}
            />
          </TableCell>
          <TableCell>{leisureExpense?.description}</TableCell>
          <TableCell>
            <NumericFormat
              value={leisureExpense?.averageAmount}
              displayType="text"
              {...NumericFormatProps}
            />
          </TableCell>
        </>
      );

      const row = <TableRow key={`row${i}`}>{cells}</TableRow>;

      rows.push(row);
    }

    return rows;
  }

  calculateTotalsPerType() {
    const essentialsTotal = this.essentialsExpenses.reduce(
      (total, expense) => total + expense.averageAmount,
      0
    );
    const investmentTotal = this.investmentExpenses.reduce(
      (total, expense) => total + expense.averageAmount,
      0
    );
    const leisureTotal = this.leisureExpenses.reduce(
      (total, expense) => total + expense.averageAmount,
      0
    );

    return [essentialsTotal, investmentTotal, leisureTotal];
  }

  makeTotalPerTypeTableRow() {
    const [essentialsTotal, investmentTotal, leisureTotal] =
      this.calculateTotalsPerType();

    return (
      <TableRow>
        <TableCell>
          <Typography>Total</Typography>
        </TableCell>
        <TableCell>
          <NumericFormat
            value={essentialsTotal}
            displayType="text"
            {...NumericFormatProps}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <NumericFormat
            value={investmentTotal}
            displayType="text"
            {...NumericFormatProps}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <NumericFormat
            value={leisureTotal}
            displayType="text"
            {...NumericFormatProps}
          />
        </TableCell>
      </TableRow>
    );
  }

  makeDifferencePerTypeTableRow() {
    const diffEssentials =
      this.incomeIdealDivision.essentials -
      this.essentialsExpenses.reduce(
        (acc, expense) => expense.averageAmount + acc,
        0
      );
    const diffInvestment =
      this.incomeIdealDivision.investment -
      this.investmentExpenses.reduce(
        (acc, expense) => expense.averageAmount + acc,
        0
      );
    const diffLeisure =
      this.incomeIdealDivision.leisure -
      this.leisureExpenses.reduce(
        (acc, expense) => expense.averageAmount + acc,
        0
      );

    const customNumericProps = { ...NumericFormatProps, allowNegative: true };

    const essentialsStyle =
      diffEssentials > 0 ? { color: "green" } : { color: "tomato" };

    const investmentStyle =
      diffInvestment > 0 ? { color: "green" } : { color: "tomato" };

    const leisureStyle =
      diffLeisure > 0 ? { color: "green" } : { color: "tomato" };

    return (
      <TableRow>
        <TableCell>
          <Typography>Difference</Typography>
        </TableCell>
        <TableCell>
          <NumericFormat
            value={diffEssentials}
            displayType="text"
            style={essentialsStyle}
            {...customNumericProps}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <NumericFormat
            value={diffInvestment}
            displayType="text"
            style={investmentStyle}
            {...customNumericProps}
          />
        </TableCell>
        <TableCell></TableCell>
        <TableCell>
          <NumericFormat
            value={diffLeisure}
            displayType="text"
            style={leisureStyle}
            {...customNumericProps}
          />
        </TableCell>
      </TableRow>
    );
  }

  calculateTotalExpensesAndAmountLeft() {
    const [essentialsTotal, investmentTotal, leisureTotal] =
      this.calculateTotalsPerType();

    const totalExpenses = essentialsTotal + investmentTotal + leisureTotal;
    const amountLeft =
      totalExpenses -
      (this.incomeIdealDivision.essentials +
        this.incomeIdealDivision.investment +
        this.incomeIdealDivision.leisure);
    return [totalExpenses, amountLeft];
  }

  makeTotalAndAmountLeftTableRow() {
    const [totalExpenses, amountLeft] =
      this.calculateTotalExpensesAndAmountLeft();
    return (
      <TableRow>
        <TableCell colSpan={3}>
          <Typography>
            Total expenses:{" "}
            <NumericFormat
              value={totalExpenses}
              displayType="text"
              {...NumericFormatProps}
            />
          </Typography>
        </TableCell>
        <TableCell colSpan={3}>
          <Typography>
            Amount left:{" "}
            <NumericFormat
              value={amountLeft}
              displayType="text"
              {...NumericFormatProps}
            />
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  monthlyCostOfLiving() {
    const [essentialsTotal, investmentTotal, leisureTotal] =
      this.calculateTotalsPerType();
    return essentialsTotal + leisureTotal;
  }
}
