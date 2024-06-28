import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import IncomeForm from "./IncomeForm";
import SummaryGrid from "./SummaryGrid";
import YearlyExpenses from "./YearlyExpenses";

function DashboardPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <div>DashboardPage</div>
      <Container component={Paper} sx={{ py: 2 }}>
        <Typography variant="h4">Income</Typography>
        <IncomeForm />
      </Container>
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
          <SummaryGrid />
          <Alert severity="info">
            Here is a gentle confirmation that your action was successful.
          </Alert>
          <Alert severity="warning">
            Here is a gentle confirmation that your action was successful.
          </Alert>
        </Box>
      </Container>
      <Container component={Paper} sx={{ py: 2 }}>
        <Typography variant="h4">Yearly expenses</Typography>
        <YearlyExpenses />
      </Container>
    </Container>
  );
}

export default DashboardPage;
