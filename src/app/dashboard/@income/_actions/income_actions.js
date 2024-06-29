"use server";

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
  return {};
}

export async function getLastIncome() {
  const income = await incomeRepository.getLastIncome();
  const incomeDTO = {
    salary: income.salary / 100,
    mealTicket: income.meal_ticket / 100,
    extras: income.extras / 100,
  };
  return incomeDTO;
}

function parseToCents(money) {
  return (
    parseFloat(money.replace(".", "").replace("R$", "").replace(",", ".")) * 100
  );
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
