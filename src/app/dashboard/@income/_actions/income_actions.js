"use server";

import { parseToCents } from "@/utils/money";
import { revalidatePath } from "next/cache";
import * as incomeRepository from "./income_repository";

/*TODO- do validations with zod
TODO - if I'm really into it, try some ORM 
*/

export async function saveIncome(prevState, formData) {
  console.log(Object.fromEntries(formData.entries()));

  const errors = validate(formData);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const income = {
    salary: parseToCents(formData.get("salary")),
    mealTicket: parseToCents(formData.get("mealTicket")),
    extras: parseToCents(formData.get("extras")),
  };

  const createdIncome = incomeRepository.createIncome(income);
  console.log("created income: " + JSON.stringify(createdIncome));
  revalidatePath("/dashboard");

  return {};
}

export async function getLastIncome() {
  const income = await incomeRepository.getLastIncome();
  const incomeDTO = {
    salary: income ? income.salary / 100 : null,
    mealTicket: income ? income.meal_ticket / 100 : null,
    extras: income ? income.extras / 100 : null,
  };
  return incomeDTO;
}

function validate(formData) {
  const errors = {};

  const salary = formData.get("salary");
  if (!salary) {
    errors.salary = "Salary is required";
  }
  if (salary < 0) {
    errors.salary = "Salary should be greater than zero";
  }

  return errors;
}
