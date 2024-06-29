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
import { useEffect, useRef, useState } from "react";
import { getAllExpenses } from "./_actions/expenses_actions";

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

export default function YearlyExpenses() {
  const [rows, setRows] = useState([]);
  const [showEditNewRow, setShowEditNewRow] = useState(false);
  const [editingCell, setEditingCell] = useState({
    rowId: null,
    column: null,
  });

  const newRowFormRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const newRows = await getAllExpenses();
      setRows(newRows);
    }

    fetchData();
  }, []);

  const handleEdit = (rowId, column) => {
    setEditingCell({ rowId, column });
  };

  const toggleAddNewRowForm = () => {
    setShowEditNewRow(!showEditNewRow);
  };

  const handleKeyDown = (event, rowId, column) => {
    if (event.key === "Escape") {
      setEditingCell({ rowId: null, column: null });
    }
    if (event.key === "Enter") {
      setEditingCell({ rowId: null, column: null });
      const newValue = event.target.value;
      console.log(
        JSON.stringify({
          rowId: rowId,
          column: column,
          value: newValue,
        })
      ); //TODO here I can call an action to "PUT" this expense
    }
  };

  const handleNewRowSubmit = async (formData) => {
    const newRow = Object.fromEntries(formData.entries());
    console.log("new row: " + JSON.stringify(newRow));
    //TODO save new row in db
    setRows((previousRows) => {
      const savedRow = { ...newRow, id: 987897, expenseRecords: [] };
      console.log("saved row: " + JSON.stringify(savedRow));
      newRowFormRef.current.reset();
      return [...previousRows, savedRow];
    });
  };

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
                  onClick={() => handleEdit(row.id, "description")}
                  sx={{ cursor: "pointer" }}
                >
                  {editingCell.rowId === row.id &&
                  editingCell.column === "description" ? (
                    <TextField
                      name="cellFieldText"
                      value={row.description}
                      onKeyDown={(event) =>
                        handleKeyDown(event, row.id, "description")
                      }
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
                    onClick={() => handleEdit(row.id, month.index)}
                    sx={{ cursor: "pointer" }}
                  >
                    {editingCell.rowId === row.id &&
                    editingCell.column === month.index ? (
                      //TODO reset and hide when lose focus
                      //TODO reset and hide when 'esc' is pressed
                      <TextField
                        name="cellFieldNumber"
                        InputProps={{
                          inputComponent: NumericFormatCustomInput,
                        }}
                        value={getAmountForMonth(row, month.index)}
                        onKeyDown={(event) =>
                          handleKeyDown(event, row.id, month.index)
                        }
                        autoFocus
                      />
                    ) : (
                      <Typography sx={{ cursor: "pointer" }}>
                        {getAmountForMonth(row, month.index)}
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
            {/* <TableRow>
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
            </TableRow> */}
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

function createEditableFieldForColumn(rowId, column, value, onKeyDown) {
  return column === "Description" ? (
    <TextField name="cellField" value={value} onKeyDown={onKeyDown} autoFocus />
  ) : (
    <TextField
      name="cellField"
      InputProps={{
        inputComponent: NumericFormatCustomInput,
      }}
      value={value}
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
