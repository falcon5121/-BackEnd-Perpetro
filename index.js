const express = require('express')
const bodyParser = require('body-parser')
const postagens = require('./rotas/postagens')
const cors = require('cors')
const mongoose = require('mongoose')
const login = require('./rotas/login')
const rawBody = require('raw-body')
const contentType = require('content-type')

const DB_PASS = encodeURIComponent('ZWcGohgoohKvMZTR')


const app = express()





app.use(
    express.urlencoded({
        extended:true,
    }),
).use(cors({
    origin: 'http://localhost:5173', 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(function (req, res, next) {
  rawBody(req, {
    length: req.headers['content-length'],
    limit: '50mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
  if (err) return next(err)
  req.text = string
  next()
  }
)})


app.set('view engine', 'ejs')
app.set('views', './views')

app.set("trust proxy", 1)

app.use(express.json())

app.use("/login", login)

app.use("/postagens", postagens)

app.get('/', (req,res) => {
    res.send('Funcionando...')
})

mongoose.connect(`mongodb+srv://fxemanuel:${DB_PASS}@perpetrodb.tillkcv.mongodb.net/Postagens?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => {
    console.log('Conectamos ao MongoDB Com sucesso!')
    app.listen(3001)
})
.catch((err) => console.log(err))
