import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import { getAllExpenses } from "../@expenses/_actions/expenses_actions";
import { getLastIncome } from "../@income/_actions/income_actions";
import SummaryGrid from "./SummaryGrid";

export default async function SummaryPage() {
  const income = await getLastIncome();
  const expenses = await getAllExpenses();

  const totalIncome = income.salary + income.mealTicket + income.extras;
  const incomeIdealDivision = {
    essentials: totalIncome * 0.5,
    investment: totalIncome * 0.15,
    leisure: totalIncome * 0.35,
  };

  const expensesAverage = groupsExpenseRecords(expenses);

  return (
    <Container component={Paper} sx={{ py: 2 }}>
      <Typography variant="h4">Summary</Typography>
      <Box
        sx={{
          display: "flex",
          height: "600px",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <SummaryGrid
          incomeIdealDivision={incomeIdealDivision}
          expensesAverage={expensesAverage}
          expenses={expenses}
        />
        <Alert severity="info">
          Here is a gentle confirmation that your action was successful.
        </Alert>
        <Alert severity="warning">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      </Box>
    </Container>
  );
}

function groupsExpenseRecords(expenses) {
  const groupedExpenses = {};
  expenses.forEach((expense) => {
    if (!groupedExpenses[expense.id]) {
      let avg = 0;
      if (expense.expenseRecords?.length > 0) {
        avg =
          expense.expenseRecords.reduce(
            (acc, record) => acc + record.amount,
            0
          ) / expense.expenseRecords.length;
      }
      groupedExpenses[expense.id] = {
        id: expense.id,
        type: expense.type,
        description: expense.description,
        averageAmount: avg,
      };
    }
  });
  return Object.values(groupedExpenses);
}
