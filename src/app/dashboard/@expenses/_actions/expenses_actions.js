"use server";

import { parseToCents } from "@/utils/money.js";
import { revalidatePath } from "next/cache.js";
import * as expensesRepository from "./expenses_repository.js";

export async function getAllExpenses() {
  const rows = await expensesRepository.getAllExpenses();
  return groupExpenses(rows);
}

export async function createExpense(expense) {
  const result = { savedExpense: null, errors: {} };

  let expenseAlreadyExists;
  try {
    expenseAlreadyExists = await expensesRepository.existsExpensesBy(
      expense.description,
      expense.type
    );
  } catch (error) {
    console.error(error);
    result.errors.description = "Unexpected error occurred.";
    return result;
  }

  if (expenseAlreadyExists) {
    result.errors.description =
      "Expense already exist. Please choose another description.";
    return result;
  }

  const savedExpense = await expensesRepository.createExpense(expense);
  result.savedExpense = savedExpense;

  revalidatePath("/dashboard"); //TODO this is probably not optimal, because there are 3 components there and I want to refresh only summary and yearlyExpenses

  return result;
}

export async function patchExpense(patchRequest) {
  //FIXME simulate slowness
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log("patchExpense() called with: ", patchRequest);
  if ("description" in patchRequest) {
    await expensesRepository.updateExpenseDescription(
      patchRequest.id,
      patchRequest.description
    );
  }
  if ("monthIndex" in patchRequest) {
    const expenseRecordExists = await expensesRepository.expenseRecordExists(
      patchRequest.id,
      patchRequest.monthIndex
    );
    if (expenseRecordExists) {
      await expensesRepository.updateExpenseMonthIndex(
        patchRequest.id,
        patchRequest.monthIndex,
        parseToCents(patchRequest.amount)
      );
    } else {
      await expensesRepository.insertExpenseRecord(
        patchRequest.id,
        2024,
        patchRequest.monthIndex,
        parseToCents(patchRequest.amount)
      );
    }
  }

  revalidatePath("/dashboard");
}

function groupExpenses(data) {
  const grouped = {};

  data.forEach((item) => {
    if (!grouped[item.id]) {
      grouped[item.id] = {
        id: item.id,
        description: item.description,
        type: item.type,
        recurrent: item.recurrent,
        expenseRecords: [],
      };
    }
    if (item.expense_record_id) {
      grouped[item.id].expenseRecords.push({
        id: item.expense_record_id,
        year: item.year,
        month: item.month,
        amount: item.amount / 100,
      });
    }
  });

  return Object.values(grouped);
}
