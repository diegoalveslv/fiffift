import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function SummaryGrid() {
  const bodyColumns = [
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

  const headerColumns = [
    {
      id: "essentials",
      header: "Essentials 50%",
      subtitle: "R$ (total * 0.5)",
    },
    {
      id: "investment",
      header: "Investment 15%",
      subtitle: "R$ (total * 0.15)",
    },
    {
      id: "leisure",
      header: "Leisure 35%",
      subtitle: "R$ (total * 0.35)",
    },
  ];

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headerColumns.map((column) => (
                <TableCell key={column.id} align="center" colSpan={2}>
                  <Typography>{column.header}</Typography>
                  <Typography variant="subtitle1">{column.subtitle}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover tabIndex={-1} key={index}>
                  {bodyColumns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`${column.id}-${index}`}
                        align={column.align}
                      >
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
