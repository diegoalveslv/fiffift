"use client";
import { NumericFormatProps } from "@/components/NumericFormatCustomInput";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function SummaryGrid({ incomeIdealDivision, expensesAverage }) {
  const headerColumns = [
    {
      id: "essentials",
      header: "Essentials 50%",
      subtitle: (
        <NumericFormat
          value={incomeIdealDivision.essentials}
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
          value={incomeIdealDivision.investment}
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
          value={incomeIdealDivision.leisure}
          displayType="text"
          {...NumericFormatProps}
        />
      ),
    },
  ];

  const essentialsExpenses = expensesAverage.filter(
    (expense) => expense.type === "ESSENTIALS"
  );
  const investmentExpenses = expensesAverage.filter(
    (expense) => expense.type === "INVESTMENT"
  );
  const leisureExpenses = expensesAverage.filter(
    (expense) => expense.type === "LEISURE"
  );

  const expensesTableRows = makeExpensesTableRows(
    essentialsExpenses,
    investmentExpenses,
    leisureExpenses
  );

  const totalPerTypeTableRow = makeTotalPerTypeTableRow(
    essentialsExpenses,
    investmentExpenses,
    leisureExpenses
  );

  const differencePerTypeTableRow = makeDifferencePerTypeTableRow(
    incomeIdealDivision,
    essentialsExpenses,
    investmentExpenses,
    leisureExpenses
  );

  // const totalAndAmountLeftTableRow = makeTotalAndAmountLeftTableRow(
  //   incomeIdealDivision,
  //   essentialsExpenses,
  //   investmentExpenses,
  //   leisureExpenses
  // );

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headerColumns.map((column) => (
                <TableCell key={column.id} align="center" colSpan={2}>
                  <Typography>{column.header}</Typography>
                  <Typography variant="subtitle1">{column.subtitle}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {expensesTableRows}
            {totalPerTypeTableRow}
            {differencePerTypeTableRow}
            <TableRow>
              <TableCell colSpan={3}>Total expenses: R$</TableCell>
              <TableCell colSpan={3}>Amount left: R$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function makeExpensesTableRows(
  essentialsExpenses,
  investmentExpenses,
  leisureExpenses
) {
  const maxRows = Math.max(
    essentialsExpenses.length,
    investmentExpenses.length,
    leisureExpenses.length
  );

  const rows = [];
  for (let i = 0; i < maxRows; i++) {
    const essentialsExpense = essentialsExpenses[i];
    const investmentExpense = investmentExpenses[i];
    const leisureExpense = leisureExpenses[i];

    const cells = (
      <>
        <TableCell>{essentialsExpense?.description}</TableCell>
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

function makeTotalPerTypeTableRow(
  essentialsExpenses,
  investmentExpenses,
  leisureExpenses
) {
  const essentialsTotal = essentialsExpenses.reduce(
    (total, expense) => total + expense.averageAmount,
    0
  );
  const investmentTotal = investmentExpenses.reduce(
    (total, expense) => total + expense.averageAmount,
    0
  );
  const leisureTotal = leisureExpenses.reduce(
    (total, expense) => total + expense.averageAmount,
    0
  );

  return (
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell>
        <NumericFormat
          value={essentialsTotal}
          displayType="text"
          {...NumericFormatProps}
        />
      </TableCell>
      <TableCell>Total</TableCell>
      <TableCell>
        <NumericFormat
          value={investmentTotal}
          displayType="text"
          {...NumericFormatProps}
        />
      </TableCell>
      <TableCell>Total</TableCell>
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

function makeDifferencePerTypeTableRow(
  incomeIdealDivision,
  essentialsExpenses,
  investmentExpenses,
  leisureExpenses
) {
  const diffEssentials =
    incomeIdealDivision.essentials -
    essentialsExpenses.reduce((acc, expense) => expense.averageAmount + acc, 0);
  const diffInvestment =
    incomeIdealDivision.investment -
    investmentExpenses.reduce((acc, expense) => expense.averageAmount + acc, 0);
  const diffLeisure =
    incomeIdealDivision.leisure -
    leisureExpenses.reduce((acc, expense) => expense.averageAmount + acc, 0);

  const customNumericProps = { ...NumericFormatProps, allowNegative: true };

  return (
    <TableRow>
      <TableCell>Difference</TableCell>
      <TableCell>
        <NumericFormat
          value={diffEssentials}
          displayType="text"
          {...customNumericProps}
        />
      </TableCell>
      <TableCell>Difference</TableCell>
      <TableCell>
        <NumericFormat
          value={diffInvestment}
          displayType="text"
          {...customNumericProps}
        />
      </TableCell>
      <TableCell>Difference</TableCell>
      <TableCell>
        <NumericFormat
          value={diffLeisure}
          displayType="text"
          {...customNumericProps}
        />
      </TableCell>
    </TableRow>
  );
}

function makeTotalAndAmountLeftTableRow(
  incomeIdealDivision,
  essentialsExpenses,
  investmentExpenses,
  leisureExpenses
) {
  return <TableRow></TableRow>;
}
