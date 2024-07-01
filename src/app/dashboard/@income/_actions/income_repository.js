import { query } from "@/database/db.js";

/*TODO - there is no audit
TODO - logs are weird
 */

export async function createIncome(income) {
  const myQuery = `
      INSERT INTO income (salary, meal_ticket, extras)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
  const values = [income.salary, income.mealTicket || 0, income.extras || 0];

  try {
    const res = await query(myQuery, values);
    console.log("repository.createIncome() result: ", res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create income record");
  }
}

export async function getLastIncome() {
  const myQuery = `
    SELECT * FROM income
    ORDER BY id DESC
    LIMIT 1;
  `;
  const res = await query(myQuery);
  console.log("repository.getLastIncome() result: ", res.rows[0]);
  return res.rows[0];
}
