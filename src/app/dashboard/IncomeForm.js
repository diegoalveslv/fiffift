import { Grid, TextField } from "@mui/material";

export default function IncomeForm() {
  return (
    <form>
      <Grid container spacing={2}>
        {/* todo format it as money */}
        <Grid item xs={12}>
          <TextField
            name="salary"
            label="Salary"
            fullWidth
            type="number"
            placeholder="R$"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="meal_ticket"
            label="Meal Ticket"
            fullWidth
            type="number"
            placeholder="R$"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="extras"
            label="Extras"
            fullWidth
            type="number"
            placeholder="R$"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <TextField
            name="total"
            label="Total"
            disabled
            type="number"
            placeholder="R$"
            InputProps={{ sx: { textAlign: "right" } }}
          />
        </Grid>
      </Grid>
    </form>
  );
}
