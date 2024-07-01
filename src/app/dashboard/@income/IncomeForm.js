"use client";

import NumericFormatCustomInput from "@/components/NumericFormatCustomInput";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useFormState } from "react-dom";
import { saveIncome } from "./_actions/income_actions";

/*
TODO add loading to fields
TODO handle unexpected database errors
TODO add toast after submitting
 */

export default function IncomeForm({ formData }) {
  const [formState, formAction] = useFormState(saveIncome, { errors: {} });
  const [values, setValues] = useState({
    salary: formData?.salary || null,
    mealTicket: formData?.mealTicket || null,
    extras: formData?.extras || null,
    total:
      (formData?.salary || 0) +
      (formData?.mealTicket || 0) +
      (formData?.extras || 0),
  });

  const handleChange = (event) => {
    setValues((previousValues) => {
      const updatedValues = {
        ...previousValues,
        [event.target.name]: event.target.value,
      };

      updatedValues.total =
        (updatedValues.salary || 0) +
        (updatedValues.mealTicket || 0) +
        (updatedValues.extras || 0);
      return updatedValues;
    });
  };

  return (
    <form action={formAction}>
      <Grid container spacing={2}>
        {/* todo format it as money */}
        <Grid item xs={12}>
          <TextField
            name="salary"
            label="Salary"
            fullWidth
            required
            value={values.salary}
            onChange={handleChange}
            InputProps={{
              inputComponent: NumericFormatCustomInput,
            }}
            error={!!formState.errors?.salary}
            helperText={formState.errors?.salary}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="mealTicket"
            label="Meal Ticket"
            fullWidth
            value={values.mealTicket}
            onChange={handleChange}
            InputProps={{
              inputComponent: NumericFormatCustomInput,
            }}
            error={!!formState.errors?.mealTicket}
            helperText={formState.errors?.mealTicket}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="extras"
            label="Extras"
            fullWidth
            value={values.extras}
            onChange={handleChange}
            InputProps={{
              inputComponent: NumericFormatCustomInput,
            }}
            error={!!formState.errors?.extras}
            helperText={formState.errors?.extras}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TextField
            name="total"
            label="Total"
            value={values.total}
            InputProps={{
              inputComponent: NumericFormatCustomInput,
              sx: { textAlign: "right" },
            }}
            error={!!formState.errors?.extras}
            helperText={formState.errors?.extras}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
