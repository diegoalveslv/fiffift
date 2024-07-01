"use client";

import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { createExpense } from "./_actions/expenses_actions";

const expenseTypes = [
  { label: "Essentials", value: "ESSENTIALS" },
  { label: "Investment", value: "INVESTMENT" },
  { label: "Leisure", value: "LEISURE" },
];

export default function CreateNewRowForm({ toggleAddNewRowForm }) {
  const newRowFormRef = useRef();

  const handleNewRowSubmit = async (prevState, formData) => {
    const newRow = Object.fromEntries(formData.entries());
    const { savedExpense, errors } = await createExpense(newRow);

    if (Object.keys(errors).length === 0) {
      newRowFormRef.current.reset();

      toggleAddNewRowForm();
    }

    return { savedExpense, errors };
  };

  const [formState, formAction] = useFormState(handleNewRowSubmit, {
    savedExpense: {},
    errors: {},
  });

  return (
    <form action={formAction} ref={newRowFormRef}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
        }}
      >
        <TextField
          name="description"
          label="Description"
          autoFocus
          error={!!formState.errors?.description}
          helperText={formState.errors?.description}
        />
        <Select
          labelId="demo-simple-select-helper-label"
          name="type"
          label="Type"
          required
          defaultValue={expenseTypes[0].value}
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
