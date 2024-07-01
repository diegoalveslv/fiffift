import NumericFormatTextDisplay from "@/components/NumericFormatTextDisplay";
import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import { getAllExpenses } from "../@expenses/_actions/expenses_actions";
import { getLastIncome } from "../@income/_actions/income_actions";
import { ExpensesSummary } from "./ExpensesSummary";
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
  const expensesSummary = new ExpensesSummary(
    incomeIdealDivision,
    expensesAverage
  );

  const monthlyCostOfLiving = expensesSummary.monthlyCostOfLiving();
  const [totalExpenses, amountLeft] =
    expensesSummary.calculateTotalExpensesAndAmountLeft();
  const alerts = [
    {
      id: 1,
      severity: "warning",
      message: (
        <Typography>
          If I get fucked, my monthly cost of living is:{" "}
          <NumericFormatTextDisplay value={monthlyCostOfLiving} />
          {"  "}
          (x4 = <NumericFormatTextDisplay value={monthlyCostOfLiving * 4} />)
        </Typography>
      ),
    },
    {
      id: 2,
      severity: "info",
      message: (
        <Typography>
          I can spend, invest or donate this amount:
          <NumericFormatTextDisplay value={amountLeft} />
        </Typography>
      ),
    },
  ];

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

        {alerts.map((alert) => (
          <Alert key={alert.id} severity={alert.severity}>
            {alert.message}
          </Alert>
        ))}
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
