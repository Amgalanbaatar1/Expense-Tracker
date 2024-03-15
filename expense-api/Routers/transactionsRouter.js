const express = require("express");
const router = express.Router();
const { sql } = require("../config/database");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  const result = await sql`select
  transactions.id,
  amount::money::numeric::float8,
  date,
  category_id,
  categories.name category_name
  from transactions
  left join categories on transactions.category_id = categories.id;`;
  res.json(result);
});

router.get("/sum", async (req, res) => {
  const incomeSum = await sql`SELECT sum (amount::money::numeric::float8) FROM transactions where amount::money::numeric::float8 > 0`;
  const expenseSum = await sql`SELECT sum (amount::money::numeric::float8) FROM transactions where amount::money::numeric::float8 < 0`;
  res.json({
    incomeSum: incomeSum[0].sum,
    expenseSum: expenseSum[0].sum,
  });
});

router.post("/", async (req, res) => {
  const { amount, category_id, date } = req.body;

  // const response = await sql`insert into transactions(amount,	category_id, id) values(1, 2, ${uuidv4()}`;
  const response = await sql`insert into transactions(id, amount, category_id, date) values(${uuidv4()}, ${amount}, ${category_id}, ${date});`;
  res.json(response);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  await sql`update transactions set title = ${title} where id = ${id}`;

  res.sendStatus(204);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await sql`delete from transactions where id = ${id}`;
  res.sendStatus(204);
});

module.exports = router;
