"use client";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { ExpensesSummary } from "./ExpensesSummary";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText.apply,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default function SummaryGrid({ incomeIdealDivision, expensesAverage }) {
  const expensesSummary = new ExpensesSummary(
    incomeIdealDivision,
    expensesAverage
  );

  const headerColumns = expensesSummary.makeHeaders();

  const expensesTableRows = expensesSummary.makeExpensesTableRows({
    StyledTableCell,
  });

  const totalPerTypeTableRow = expensesSummary.makeTotalPerTypeTableRow();

  const differencePerTypeTableRow =
    expensesSummary.makeDifferencePerTypeTableRow();

  const totalAndAmountLeftTableRow =
    expensesSummary.makeTotalAndAmountLeftTableRow();

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headerColumns.map((column) => (
                <StyledTableCell key={column.id} align="center" colSpan={2}>
                  <Typography fontWeight="bold">{column.header}</Typography>
                  <Typography variant="subtitle1">{column.subtitle}</Typography>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{expensesTableRows}</TableBody>
          <TableFooter>
            {totalPerTypeTableRow}
            {differencePerTypeTableRow}
            {totalAndAmountLeftTableRow}
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
