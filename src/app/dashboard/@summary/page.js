import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import SummaryGrid from "./SummaryGrid";

export default function SummaryPage() {
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
        <SummaryGrid />
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
