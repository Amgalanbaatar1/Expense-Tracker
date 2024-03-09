const express = require("express");
const router = express.Router();
const { sql } = require("../config/database");
const short = require("short-uuid");

router.get("/", async (req, res) => {
  const result = await sql`select * from categories`;
  res.json(result);
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  // const response = await sql`insert into categories(name, id)values(${name},${uuidv4()})`;

  const response = await sql`insert into categories(id, name) values(${short.generate()},${name})`;

  res.json(response);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await sql`update categories set title = ${name} where id = ${id}`;

  res.sendStatus(204);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await sql`delete from categories where id = ${id}`;
  res.sendStatus(204);
});

module.exports = router;
