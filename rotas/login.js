const router = require("express").Router();
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();

// const mongoURI = `mongodb+srv://fxemanuel:${encodeURIComponent(
//   process.env.MONGOPASS_KEY
// )}@perpetrodb.tillkcv.mongodb.net/Postagens?retryWrites=true&w=majority`;

// router.get("/deslogar", (req, res) => {
//   req.session.destroy((err) => {
//     console.log(err);
//   });
//   res.send("voce foi deslogado");
// });

// router.get("/register", (req, res) => {
//   res.render("register");
// });

module.exports = router;
