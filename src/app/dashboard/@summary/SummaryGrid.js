"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ExpensesSummary } from "./ExpensesSummary";

export default function SummaryGrid({ incomeIdealDivision, expensesAverage }) {
  const expensesSummary = new ExpensesSummary(
    incomeIdealDivision,
    expensesAverage
  );

  const headerColumns = expensesSummary.makeHeaders();

  const expensesTableRows = expensesSummary.makeExpensesTableRows();

  const totalPerTypeTableRow = expensesSummary.makeTotalPerTypeTableRow();

  const differencePerTypeTableRow =
    expensesSummary.makeDifferencePerTypeTableRow();

  const totalAndAmountLeftTableRow =
    expensesSummary.makeTotalAndAmountLeftTableRow();

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
            {totalAndAmountLeftTableRow}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
