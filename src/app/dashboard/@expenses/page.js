import { Container, Paper, Typography } from "@mui/material";
import YearlyExpenses from "./YearlyExpenses";

export default function ExpensesPage() {
  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Typography variant="h4">Yearly expenses</Typography>
      <YearlyExpenses />
    </Container>
  );
}
