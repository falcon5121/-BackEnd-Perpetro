const express = require("express");

const postagens = require("./rotas/postagens");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const publicLogin = require("./routes/publicRoutes/login");
const publicRegister = require("./routes/publicRoutes/register");
const privateRoutes = require("./routes/privateRoutes/privateRoutes");

const app = express();

app
  .use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  )
  .use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: 200,
    })
  )
  .use(express.json({ limit: "50mb" }));

app.set("view engine", "ejs").set("views", "./views").set("trust proxy", 1);

app
  .use(express.json())
  .use("/postagens", postagens)
  .use("/login", publicLogin)
  .use("/register", publicRegister);
// app.use(privateRoutes);

app.get("/", (req, res) => {
  res.send("Funcionando...");
});

const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://fxemanuel:${encodeURIComponent(
      process.env.MONGOPASS_KEY
    )}@perpetrodb.tillkcv.mongodb.net/Postagens?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conectamos ao MongoDB Com sucesso!");
    app.listen(port);
  })
  .catch((err) => console.log(err));
