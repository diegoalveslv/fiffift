import { Container, Paper, Typography } from "@mui/material";
import IncomeForm from "./IncomeForm";

export default function IncomePage() {
  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Typography variant="h4">Income</Typography>
      <IncomeForm />
    </Container>
  );
}
