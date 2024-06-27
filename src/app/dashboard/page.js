import {
  Alert,
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

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
      <Box>
        <Typography>Yearly expenses</Typography>
      </Box>
    </Container>
  );
}

function IncomeForm() {
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

function SummaryGrid() {
  const columns = [
    { id: "descriptionEssentials", label: "Description" },
    {
      id: "amountEssentials",
      label: "Amount",
    },
    { id: "descriptionInvestment", label: "Description" },
    {
      id: "amountInvestment",
      label: "Amount",
    },
    { id: "descriptionLeisure", label: "Description" },
    {
      id: "amountLeisure",
      label: "Amount",
    },
  ];

  const rowsEssentials = [
    { descriptionEssentials: "power", amountEssentials: 150 },
    { descriptionEssentials: "internet", amountEssentials: 120 },
  ];

  const rowsInvestment = [
    { descriptionInvestment: "bonds", amountInvestment: 100 },
    { descriptionInvestment: "stock", amountInvestment: 200 },
    { descriptionInvestment: "gambling", amountInvestment: 2000 },
  ];

  const rowsLeisure = [
    { descriptionLeisure: "Credit Card", amountLeisure: 1000 },
  ];

  const maxLength = Math.max(
    rowsEssentials.length,
    rowsInvestment.length,
    rowsLeisure.length
  );

  const rows = [];
  for (let i = 0; i < maxLength; i++) {
    const row1 = rowsEssentials[i] || {};
    const row2 = rowsInvestment[i] || {};
    const row3 = rowsLeisure[i] || {};
    rows.push({
      descriptionEssentials: row1.descriptionEssentials,
      amountEssentials: row1.amountEssentials,
      descriptionInvestment: row2.descriptionInvestment,
      amountInvestment: row2.amountInvestment,
      descriptionLeisure: row3.descriptionLeisure,
      amountLeisure: row3.amountLeisure,
    });
  }

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Essentials 50%
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Investment 15%
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Leisure 35%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                R$ (total * 0.5)
              </TableCell>
              <TableCell align="center" colSpan={2}>
                R$ (total * 0.15)
              </TableCell>
              <TableCell align="center" colSpan={2}>
                R$ (total * 0.35)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>R$</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>R$</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>R$</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Difference</TableCell>
              <TableCell>R$</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>R$</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>R$</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total expenses: R$</TableCell>
              <TableCell colSpan={3}>Amount left: R$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DashboardPage;
