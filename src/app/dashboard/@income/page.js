import { Container, Paper, Typography } from "@mui/material";
import IncomeForm from "./IncomeForm";
import { getLastIncome } from "./_actions/income_actions";

export default async function IncomePage() {
  const formData = await getLastIncome();

  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Typography variant="h4">Income</Typography>
      <IncomeForm formData={formData} />
    </Container>
  );
}
