import { query } from "@/database/db.js";

export async function getAllExpenses() {
  const myQuery = `
  SELECT
    E.ID AS ID,
    E.DESCRIPTION AS DESCRIPTION,
    E.TYPE AS TYPE,
    E.RECURRENT AS RECURRENT,
    ER.ID AS EXPENSE_RECORD_ID,
    ER.YEAR AS YEAR,
    ER.MONTH AS MONTH,
    ER.AMOUNT AS AMOUNT
  FROM
    EXPENSE E
    LEFT JOIN EXPENSE_RECORD ER ON E.ID = ER.EXPENSE_ID;
  `;

  const res = await query(myQuery);
  console.log("repository.getAllExpenses() result: ", res.rows);
  return res.rows;
}

export async function createExpense(expense) {
  const myQuery = `
    insert into expense (description, type) values ($1, $2) returning *;
  `;
  const res = await query(myQuery, [expense.description, expense.type]);
  console.log("repository.createExpense() result: ", res.rows);
  return res.rows[0];
}

export async function existsExpensesBy(description, type) {
  const myQuery = `
    select 1 from expense where description = $1 and type = $2 limit 1;
  `;
  const res = await query(myQuery, [description, type]);
  console.log("repository.existsExpensesBy() result: ", res.rows);
  return res.rows.length > 0;
}
