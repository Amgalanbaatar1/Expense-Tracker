const express = require("express");
const { sql } = require("../config/database");
const router = express.Router();
const short = require("short-uuid");
const bcrypt = require("bcryptjs");

//============================Sign UP=======================//

router.post("/create", async (req, res) => {
  const { email, name, password } = req.body;

  //1. Check duplicate username.
  const users = await sql`SELECT * from users WHERE name=${name}`;
  if (users.length > 0) {
    res.status(400).json({ message: "This user is already registered." });
    return;
  }
  //2. password validation.
  if (password.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters." });
    return;
  }
  //.3Register user

  const hash = bcrypt.hashSync(password, 8);
  await sql`insert into users(id,email,name,password) values(${short.generate()},${email},${name},${hash})`;
  //4. Success Response
  res.status(200).json({ message: "Successfully registered." });
});

//============================Log In==========================//

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //1. Check is username is exist
  const users = await sql`SELECT * FROM users WHERE email=${email}`;
  if (users.length === 0) {
    res.status(400).json({ message: "Username or password is not correct." });
    return;
  }

  //2. Password Check
  const user = users[0];

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).json({ message: "Username or password is not correct." });
    return;
  }
  //3. Success response

  res.status(200).json({ message: "Successfully login" });
});

module.exports = router;
