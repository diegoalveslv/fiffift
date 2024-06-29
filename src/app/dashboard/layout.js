import { Container } from "@mui/material";

export default function DashboardLayout({ income, summary, expenses }) {
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
      {income}
      {summary}
      {expenses}
    </Container>
  );
}
