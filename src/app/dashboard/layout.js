import { Container, Typography } from "@mui/material";

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
      <Typography
        variant="h3"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        FIFFIFT
      </Typography>
      {income}
      {summary}
      {expenses}
    </Container>
  );
}
