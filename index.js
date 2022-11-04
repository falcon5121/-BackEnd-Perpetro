const express = require('express')
const bodyParser = require('body-parser')
const postagens = require('./rotas/postagens')
const cors = require('cors')
const mongoose = require('mongoose')

const DB_PASS = encodeURIComponent('6r99nmqNBxk2LwTj')


const app = express()

app.use(
    express.urlencoded({
        extended:true,
    }),
)

app.use(express.json())

app.use("/postagens", postagens)
    // app.use(bodyParser.json())
    //     .use(cors({
    //         origin:'*'
    //     }))
    //     .use(bodyParser.urlencoded({extended:false}))
    //     .get('/', (req,res) => {
    //         res.send('funcionando')
    //         })
    // .use('/api', rotas)
    // .use(express.static(__dirname + '../FrontEnd/FrontEnd PerPetro/'))
    // .listen(3001, () => {
    //     console.log('server running on http:/localhost:3001')
    // })
    

app.get('/', (req,res) => {
    res.send('Funcionando...')
})

mongoose.connect(`mongodb+srv://fxemanuel:${DB_PASS}@perpetrodb.tillkcv.mongodb.net/Postagens?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao MongoDB Com sucesso!')
    app.listen(3001)
})
.catch((err) => console.log(err))