import { query } from "@/database/db.js";

export async function getAllExpenses() {
  const myQuery = `
    select * from expense e join expense_record er on e.id = er.expense_id;
  `;
  const res = await query(myQuery);
  console.log("repository.getAllExpenses() result: ", res.rows);
  return res.rows;
}
