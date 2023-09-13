const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../../models/Users");

router.post("/", async (req, res) => {
  const { user, pass } = req.body;

  if (!pass == "") {
    const data = await Users.findOne({ Username: user });
    if (data) {
      return res.redirect("/login");
    } else {
      const hashedPsw = await bcrypt.hash(pass, 12);
      await Users.create({
        Username: user,
        Password: hashedPsw,
      });
      return res.status(200).json({ message: "Usuário criado com sucesso!" });
    }
  }
  return res
    .status(400)
    .json({ message: "senha é um dos requisistos para criação de usuário!" });
});

module.exports = router;
