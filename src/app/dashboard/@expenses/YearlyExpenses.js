import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function YearlyExpenses() {
  const columns = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const rows = [
    {
      id: 1,
      name: "Gas bills",
      isLeisure: false,
      amountJan: 93.05,
      amountFeb: 100.05,
      amountMar: 105.05,
      amountApr: 110.05,
      amountMay: 115.05,
      amountJun: 120.05,
      amountJul: 125.05,
      amountAug: 130.05,
      amountSep: 135.05,
      amountOct: 140.05,
      amountNov: 145.05,
      amountDec: 150.05,
    },
    {
      id: 2,
      name: "Electricity",
      isLeisure: false,
      amountJan: 100.05,
      amountFeb: 100,
      amountMar: 100,
    },
    {
      id: 3,
      name: "Rent",
      isLeisure: false,
      amountJan: 100.05,
      amountFeb: 100,
    },
    {
      id: 4,
      name: "Credit Card",
      isLeisure: true,
      amountJan: 100.05,
      amountFeb: 100,
    },
  ];

  const totalWithLeisureRow = {
    name: "Total with leisure",
    totalAmountJan: 8888,
    totalAmountFeb: 100,
    totalAmountMar: 100,
    totalAmountApr: 100,
    totalAmountMay: 300,
    totalAmountJun: 500,
    totalAmountJul: 100,
    totalAmountAug: 600,
    totalAmountSep: 100,
    totalAmountOct: 700,
    totalAmountNov: 100,
    totalAmountDec: 800,
  };

  const totalWithoutLeisureRow = {
    name: "Total without leisure",
    totalAmountJan: 8888,
    totalAmountFeb: 100,
    totalAmountMar: 100,
    totalAmountApr: 100,
    totalAmountMay: 300,
    totalAmountJun: 500,
    totalAmountJul: 100,
    totalAmountAug: 600,
    totalAmountSep: 100,
    totalAmountOct: 700,
    totalAmountNov: 100,
    totalAmountDec: 800,
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column, index) => (
                  <TableCell key={`${row.id}-${index}`}>
                    {column === "" ? row.name : row[`amount${column}`]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{totalWithLeisureRow.name}</TableCell>
              {columns.map(
                (column, index) =>
                  column !== "" && (
                    <TableCell key={`'totalWithLeisure-${index}`}>
                      {totalWithLeisureRow[`totalAmount${column}`]}
                    </TableCell>
                  )
              )}
            </TableRow>
            <TableRow>
              <TableCell>{totalWithoutLeisureRow.name}</TableCell>
              {columns.map(
                (column, index) =>
                  column !== "" && (
                    <TableCell key={`'totalWithoutLeisure-${index}`}>
                      {totalWithoutLeisureRow[`totalAmount${column}`]}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
