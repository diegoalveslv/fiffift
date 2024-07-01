"use client";

import NumericFormatCustomInput, {
  NumericFormatProps,
} from "@/components/NumericFormatCustomInput";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useTransition } from "react";
import { NumericFormat } from "react-number-format";
import CreateNewRowForm from "./CreateNewRowForm";
import { patchExpense } from "./_actions/expenses_actions";

const months = [
  { code: "Jan", index: 0 },
  { code: "Feb", index: 1 },
  { code: "Mar", index: 2 },
  { code: "Apr", index: 3 },
  { code: "May", index: 4 },
  { code: "Jun", index: 5 },
  { code: "Jul", index: 6 },
  { code: "Aug", index: 7 },
  { code: "Sep", index: 8 },
  { code: "Oct", index: 9 },
  { code: "Nov", index: 10 },
  { code: "Dec", index: 11 },
];

// TODO add toast for better feedback
// FIXME there is a bug when removing the value of a month. It should clear the text after submission, but it doesn't even though the value is cleared

export default function YearlyExpenses({ rows }) {
  const [showEditNewRow, setShowEditNewRow] = useState(false);
  const [editingCell, setEditingCell] = useState({
    rowId: null,
    column: null,
  });
  const [isPending, startTransition] = useTransition();

  const handleEditCell = (rowId, column) => {
    setEditingCell({ rowId, column });
  };

  const resetEditCell = () => {
    setEditingCell({ rowId: null, column: null });
  };

  const toggleAddNewRowForm = () => {
    setShowEditNewRow(!showEditNewRow);
  };

  const handleCellKeyDown = (event, rowId, column) => {
    if (event.key === "Escape") {
      resetEditCell();
    }
    if (event.key === "Enter") {
      const newValue = event.target.value;

      const patchReq =
        column === "description"
          ? { id: rowId, description: newValue }
          : { id: rowId, monthIndex: column, amount: newValue };

      startTransition(async () => {
        await patchExpense(patchReq);
        resetEditCell();
      });
    }
  };

  const totalEssentials = makeTotalByTypes(
    rows,
    ["ESSENTIALS"],
    "Essentials total: "
  );

  const totalInvestment = makeTotalByTypes(
    rows,
    ["INVESTMENT"],
    "Investment total: "
  );

  const totalLeisure = makeTotalByTypes(rows, ["LEISURE"], "Leisure total: ");

  const totalAllTypes = makeTotalByTypes(
    rows,
    ["ESSENTIALS", "INVESTMENT", "LEISURE"],
    "All types total: "
  );

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              {months.map((month) => (
                <TableCell key={month.code}>{month.code}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  onClick={() => handleEditCell(row.id, "description")}
                  sx={{ cursor: "pointer" }}
                >
                  {editingCell.rowId === row.id &&
                  editingCell.column === "description" ? (
                    <TextField
                      name="cellFieldText"
                      disabled={isPending}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {isPending && <CircularProgress size={20} />}
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={row.description}
                      onKeyDown={(event) =>
                        handleCellKeyDown(event, row.id, "description")
                      }
                      onBlur={resetEditCell}
                      autoFocus
                    />
                  ) : (
                    <Typography sx={{ cursor: "pointer" }}>
                      {row.description}
                    </Typography>
                  )}
                </TableCell>
                {months.map((month) => (
                  <TableCell
                    key={`${row.id}-${month.index}`}
                    onClick={() => handleEditCell(row.id, month.index)}
                    sx={{ cursor: "pointer" }}
                  >
                    {editingCell.rowId === row.id &&
                    editingCell.column === month.index ? (
                      <TextField
                        name="cellFieldNumber"
                        disabled={isPending}
                        InputProps={{
                          inputComponent: NumericFormatCustomInput,
                          endAdornment: (
                            <InputAdornment position="end">
                              {isPending && <CircularProgress size={20} />}
                            </InputAdornment>
                          ),
                        }}
                        defaultValue={getAmountForMonth(row, month.index)}
                        onKeyDown={(event) =>
                          handleCellKeyDown(event, row.id, month.index)
                        }
                        onBlur={resetEditCell}
                        autoFocus
                      />
                    ) : (
                      <Typography sx={{ cursor: "pointer" }}>
                        <NumericFormat
                          value={getAmountForMonth(row, month.index)}
                          displayType="text"
                          {...NumericFormatProps}
                        />
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={months.length + 1}>
                {showEditNewRow ? (
                  <CreateNewRowForm toggleAddNewRowForm={toggleAddNewRowForm} />
                ) : (
                  <Button variant="text" onClick={toggleAddNewRowForm}>
                    + add new row
                  </Button>
                )}
              </TableCell>
            </TableRow>
            {totalEssentials}
            {totalInvestment}
            {totalLeisure}
            {totalAllTypes}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function getAmountForMonth(expense, monthIndex) {
  return (
    expense.expenseRecords
      .filter((expense) => expense.month === monthIndex)
      .pop()?.amount || null
  );
}

function makeTotalByTypes(expenses, types, label) {
  let cells = [];
  const expenseRecords = expenses
    .filter((expense) => types.includes(expense.type))
    .map((expense) => expense.expenseRecords)
    .flat();

  for (let i = 0; i < 11; i++) {
    const amountForMonth = expenseRecords
      .filter((rec) => rec.month === i)
      .reduce((acc, rec) => acc + rec.amount, 0);
    const cell = (
      <TableCell key={`cell-${types}-${i}`}>
        {amountForMonth > 0 && (
          <NumericFormat
            value={amountForMonth}
            displayType="text"
            {...NumericFormatProps}
          />
        )}
      </TableCell>
    );
    cells.push(cell);
  }

  return (
    <TableRow>
      <TableCell>
        <Typography>{label}</Typography>
      </TableCell>
      {cells}
    </TableRow>
  );
}
