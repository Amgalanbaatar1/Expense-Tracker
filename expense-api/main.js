const express = require("express");
const cors = require("cors");
const transactionsRouter = require(".//Routers/transactionsRouter");
const categoriesRouter = require("./Routers/categoriesRouter");
const dbUsername = "amgaa@pinecone.mn";
const dbPassword = "Pinecone123";
const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

app.use("/transactions", transactionsRouter);
app.use("/categories", categoriesRouter);
app.post("/login", (req, res) => {
  const { email, pass } = req.body;

  if (email !== dbUsername) {
    res.sendStatus(401);
    return;
  }

  if (pass !== dbPassword) {
    res.sendStatus(401);
    return;
  }

  console.log(email, pass);
  res.json("success");
});
// app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
