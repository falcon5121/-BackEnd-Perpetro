const router = require("express").Router();

const mongoose = require("mongoose");
const Posts = require("../models/Posts");

router.get("/", async (req, res) => {
  const postagens = mongoose.model("posts", Posts);

  postagens.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/publis/:id", async (req, res) => {
  const postagens = mongoose.model("posts", Posts);

  postagens.find({}, (err, result) => {
    res.send(result[req.params.id]);
  });
});

router.post("/", async (req, res) => {
  try {
    const d = new Date();

    const dia = () => {
      if (d.getDay() < 10) {
        return `0${d.getDay()}`;
      } else {
        d.getDay();
      }
    };

    const mes = () => {
      if (d.getMonth() < 10) {
        return `0${d.getMonth()}`;
      } else {
        return d.getMonth();
      }
    };

    const hora = () => {
      if (d.getHours() < 10) {
        return `0${d.getHours()}`;
      } else {
        return d.getHours();
      }
    };

    const min = () => {
      if (d.getMinutes() < 10) {
        return `0${d.getMinutes()}`;
      } else {
        return d.getMinutes();
      }
    };

    const { Title, SubTitle, Content } = req.body;

    const Postagem = mongoose.model("post", Posts);

    const doc = new Postagem({
      tittle: Title,
      subTittle: SubTitle,
      content: Content,
      date: `${dia}/${mes} - ${hora}:${min}`,
    });

    await doc.save();
    res.send("Post criado com sucesso!");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
