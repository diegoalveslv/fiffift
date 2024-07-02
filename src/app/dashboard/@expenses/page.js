import { Container, Paper, Typography } from "@mui/material";
import YearlyExpenses from "./YearlyExpenses";
import { getAllExpenses } from "./_actions/expenses_actions";

export default async function ExpensesPage() {
  const expenseRows = await getAllExpenses();

  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Typography variant="h4">Yearly Expenses</Typography>
      <YearlyExpenses rows={expenseRows} />
    </Container>
  );
}
