const router = require("express").Router();
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { user, pass } = req.body;

    Users.findOne({ Username: user }, async (requi, result) => {
      if (!result) {
        return res.status(400).send("sem resultados!");
      }
      const hashed = result.Password;
      const isMatch = await bcrypt.compare(pass, hashed);

      if (!isMatch) {
        // return res.send("senha errada");
        return res.status(400).send({ Error: "Senha incorreta!" });
      }

      const payload = {
        user: user,
      };

      const code = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      res.send(code);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Esta mensagem é para dizer que voce esta na rota login",
  });
});

module.exports = router;
