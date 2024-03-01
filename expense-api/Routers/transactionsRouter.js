const express = require("express");
const router = express.Router();
const { sql } = require("../config/database");

router.get("/", async (req, res) => {
  const result = await sql`select * from transactions`;
  res.json(result);
});

router.post("/", async (req, res) => {
  const { amount, title, user_id, description } = req.body;

  const response = await sql`insert into transactions(amount,description,title
    ,user_id) values(${amount},${description},${title},${user_id})`;
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
