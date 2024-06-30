export function parseToCents(money) {
  return (
    parseFloat(money.replace(".", "").replace("R$", "").replace(",", ".")) * 100
  );
}
