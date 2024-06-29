"use client";

import NumericFormatCustomInput from "@/components/NumericFormatCustomInput";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

const expenseTypes = [
  { label: "Essentials", value: "ESSENTIALS" },
  { label: "Investment", value: "INVESTMENT" },
  { label: "Leisure", value: "LEISURE" },
];

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

const expenses = [
  {
    id: 1,
    description: "Gas bills",
    type: "ESSENTIAL",
    recurrent: true,
    expenseRecords: [
      {
        id: 1,
        year: 2024,
        month: 4,
        amount: 124.4,
      },
      {
        id: 2,
        year: 2024,
        month: 5,
        amount: 41.45,
      },
      {
        id: 3,
        year: 2024,
        month: 6,
        amount: 13,
      },
    ],
  },
  {
    id: 2,
    description: "Sports bets",
    type: "INVESTMENT",
    recurrent: true,
    expenseRecords: [
      {
        id: 4,
        year: 2024,
        month: 0,
        amount: 1434.4,
      },
      {
        id: 5,
        year: 2024,
        month: 3,
        amount: 654.45,
      },
      {
        id: 6,
        year: 2024,
        month: 4,
        amount: 4565,
      },
    ],
  },
  {
    id: 3,
    description: "Credit Card",
    type: "LEISURE",
    recurrent: true,
    expenseRecords: [
      {
        id: 7,
        year: 2024,
        month: 3,
        amount: 23435.12,
      },
      {
        id: 8,
        year: 2024,
        month: 6,
        amount: 324.45,
      },
      {
        id: 9,
        year: 2024,
        month: 11,
        amount: 12,
      },
    ],
  },
];

export default function YearlyExpenses() {
  const [showEditNewRow, setShowEditNewRow] = useState(false);
  const [editingCell, setEditingCell] = useState({
    rowId: null,
    column: null,
  });

  const [lastChangedExpense, setLastChangedExpense] = useState({
    id: null,
    description: null,
    expenseRecords: [{ year: null, month: null, amount: null }],
  });

  const newRowFormRef = useRef();

  const handleEdit = (rowId, column) => {
    setEditingCell({ rowId, column });
  };

  const toggleAddNewRowForm = () => {
    setShowEditNewRow(!showEditNewRow);
  };

  const handleChange = (event, rowId, column) => {
    let newLastChangedExpense;
    if (lastChangedExpense && lastChangedExpense.id === null) {
      newLastChangedExpense = expenses
        .filter((expense) => expense.id === rowId)
        .pop();
    } else {
      newLastChangedExpense = lastChangedExpense;
    }

    const newRows = [...rows];
    if (column === "Description") {
      newRows
        .filter((row) => row.id === rowId)
        .forEach((row) => {
          newLastChangedExpense.description = event.target.value;

          row.description = event.target.value;
        });
    } else {
      newRows
        .filter((row) => row.id === rowId)
        .forEach((row) => {
          const monthIndex = getIndexForMonthCode(column);
          newLastChangedExpense.expenseRecords = [
            ...newLastChangedExpense.expenseRecords,
            { year: 2024, month: monthIndex, amount: event.target.value },
          ];

          row[`amount${column}`] = event.target.value;
        });
    }

    setLastChangedExpense(newLastChangedExpense);
    setRows(newRows);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setEditingCell({ rowId: null, column: null });
    }
    if (event.key === "Enter") {
      setEditingCell({ rowId: null, column: null });
      console.log(lastChangedExpense); //TODO here I can call an action to "PUT" this expense
    }
  };

  const columns = ["Description", ...months.map((month) => month.code)];

  const initRows = expenses.map((expense) => {
    let row = {
      id: expense.id,
      description: expense.description,
    };

    months.forEach((month) => {
      const records = expense.expenseRecords.filter(
        (record) => record.month === month.index
      );

      if (records.length > 0) {
        row[`amount${month.code}`] = records[0].amount;
      }
    });

    return row;
  });

  const handleNewRowSubmit = async (formData) => {
    const newRow = Object.fromEntries(formData.entries());
    console.log("new row: " + JSON.stringify(newRow));
    //TODO save new row in db
    setRows((previousRows) => {
      const savedRow = { ...newRow, id: 987897 };
      console.log("saved row: " + JSON.stringify(savedRow));
      newRowFormRef.current.reset();
      return [...previousRows, savedRow];
    });
  };

  const [rows, setRows] = useState(initRows);

  const totalWithLeisureRow = {
    name: "Total with leisure",
    totalAmountJan: 8888,
    totalAmountFeb: 100,
    totalAmountMar: 100,
    totalAmountApr: 100,
    totalAmountMay: 300,
    totalAmountJun: 500,
    totalAmountJul: 100,
    totalAmountAug: 600,
    totalAmountSep: 100,
    totalAmountOct: 700,
    totalAmountNov: 100,
    totalAmountDec: 800,
  };

  const totalWithoutLeisureRow = {
    name: "Total without leisure",
    totalAmountJan: 8888,
    totalAmountFeb: 100,
    totalAmountMar: 100,
    totalAmountApr: 100,
    totalAmountMay: 300,
    totalAmountJun: 500,
    totalAmountJul: 100,
    totalAmountAug: 600,
    totalAmountSep: 100,
    totalAmountOct: 700,
    totalAmountNov: 100,
    totalAmountDec: 800,
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={`${row.id}-${column}`}
                    onClick={() => handleEdit(row.id, column)}
                    sx={{ cursor: "pointer" }}
                  >
                    {editingCell.rowId === row.id &&
                    editingCell.column === column ? (
                      //TODO reset and hide when lose focus
                      //TODO reset and hide when 'esc' is pressed
                      createEditableFieldForColumn(
                        column,
                        column === "Description"
                          ? row.description
                          : row[`amount${column}`],
                        (event) => handleChange(event, row.id, column),
                        (event) => handleKeyDown(event)
                      )
                    ) : (
                      <Typography sx={{ cursor: "pointer" }}>
                        {column === "Description"
                          ? row.description
                          : row[`amount${column}`]}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={months.length + 1}>
                {showEditNewRow ? (
                  createNewRowForm(
                    handleNewRowSubmit,
                    newRowFormRef,
                    toggleAddNewRowForm
                  )
                ) : (
                  <Button variant="text" onClick={toggleAddNewRowForm}>
                    + add new row
                  </Button>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{totalWithLeisureRow.name}</TableCell>
              {columns.map(
                (column, index) =>
                  column !== "" && (
                    <TableCell key={`'totalWithLeisure-${index}`}>
                      {totalWithLeisureRow[`totalAmount${column}`]}
                    </TableCell>
                  )
              )}
            </TableRow>
            <TableRow>
              <TableCell>{totalWithoutLeisureRow.name}</TableCell>
              {columns.map(
                (column, index) =>
                  column !== "" && (
                    <TableCell key={`'totalWithoutLeisure-${index}`}>
                      {totalWithoutLeisureRow[`totalAmount${column}`]}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function createNewRowForm(
  handleNewRowSubmit,
  newRowFormRef,
  toggleAddNewRowForm
) {
  return (
    <form action={handleNewRowSubmit} ref={newRowFormRef}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
        }}
      >
        <TextField name="description" label="Description" autoFocus />
        <Select
          labelId="demo-simple-select-helper-label"
          name="type"
          label="Type"
          required
          value={expenseTypes[0].value}
        >
          {expenseTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>

        <Button type="submit" variant="contained">
          save
        </Button>
        <Button type="button" variant="outlined" onClick={toggleAddNewRowForm}>
          close
        </Button>
      </Box>
    </form>
  );
}

function createEditableFieldForColumn(column, value, onChange, onKeyDown) {
  return column === "Description" ? (
    <TextField
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus
    />
  ) : (
    <TextField
      InputProps={{
        inputComponent: NumericFormatCustomInput,
      }}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
}

function getIndexForMonthCode(monthCode) {
  return months
    .filter((month) => month.code === monthCode)
    .map((month) => month.index)
    .pop();
}
