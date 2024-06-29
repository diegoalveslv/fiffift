"use server";

import * as expensesRepository from "./expenses_repository.js";

export async function getAllExpenses() {
  const rows = await expensesRepository.getAllExpenses();
  return groupExpenses(rows);
}

function groupExpenses(data) {
  const grouped = {};

  data.forEach((item) => {
    if (!grouped[item.expense_id]) {
      grouped[item.expense_id] = {
        id: item.expense_id,
        description: item.description,
        type: item.type,
        recurrent: item.recurrent,
        expenseRecords: [],
      };
    }
    grouped[item.expense_id].expenseRecords.push({
      id: item.id,
      year: item.year,
      month: item.month,
      amount: item.amount,
    });
  });

  return Object.values(grouped);
}
