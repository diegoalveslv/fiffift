import { getClient, query } from "@/database/db.js";

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
  // console.log("repository.getAllExpenses() result: ", res.rows);
  console.log("repository.getAllExpenses() result size: ", res.rows.length);
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

export async function updateExpenseDescription(id, description) {
  const myQuery = `
    update expense set description = $1 where id = $2 returning *;
  `;
  const res = await query(myQuery, [description, id]);
  console.log("repository.updateExpenseDescription() result: ", res.rows);
}

export async function updateExpenseMonthIndex(id, monthIndex, amount) {
  const myQuery = `
    update expense_record set amount = $3 where expense_id = $1 and month = $2 returning *;
  `;
  const res = await query(myQuery, [id, monthIndex, amount]);
  console.log("repository.updateExpenseMonthIndex() result: ", res.rows);
}

export async function expenseRecordExists(expense_id, monthIndex) {
  const myQuery = `
    select 1 from expense_record where expense_id = $1 and month = $2 limit 1;
  `;
  const res = await query(myQuery, [expense_id, monthIndex]);
  console.log("repository.expenseRecordExists() result: ", res.rows);
  return res.rows.length > 0;
}

export async function insertExpenseRecord(
  expense_id,
  year,
  monthIndex,
  amount
) {
  const myQuery = `
    insert into expense_record (expense_id, year, month, amount) values ($1, $2, $3, $4) returning *;
  `;
  const res = await query(myQuery, [expense_id, year, monthIndex, amount]);
  console.log("repository.insertExpenseRecord() result: ", res.rows);
  return res.rows[0];
}

export async function deleteExpense(id) {
  const myQuery1 = `
    delete from expense_record where expense_id = $1;
  `;

  const myQuery2 = `
    delete from expense where id = $1;
  `;

  const client = await getClient();

  try {
    await client.query("BEGIN");
    await client.query(myQuery1, [id]);
    await client.query(myQuery2, [id]);
    await client.query("COMMIT");
  } catch (e) {
    console.log(e);
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

export async function deleteExpenseRecord(expenseId, monthIndex) {
  const myQuery = `
    delete from expense_record where expense_id = $1 and month = $2 returning *;
    `;

  const res = await query(myQuery, [expenseId, monthIndex]);
  console.log("repository.deleteExpenseRecord() result: ", res.rows);
}
