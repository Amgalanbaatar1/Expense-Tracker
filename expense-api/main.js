const express = require("express");
const cors = require("cors");
const transactionsRouter = require(".//Routers/transactionsRouter");
const categoriesRouter = require("./Routers/categoriesRouter");
const usersRouter = require("./Routers/usersRouter");
const { sql } = require("./config/database");

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
