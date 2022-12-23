


const router = require('express').Router()
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Posts = require('../models/Posts')
const Users = require('../models/Users')
const MongoDBSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcrypt')

const mongoURI = 'mongodb+srv://fxemanuel:ZWcGohgoohKvMZTR@perpetrodb.tillkcv.mongodb.net/Postagens?retryWrites=true&w=majority'


const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'login'
})

router.use(session({
    secret: 'secretsq',
    resave: false,
    saveUninitialized: false,
    store: store
}))


router.use(bodyParser.urlencoded({extended: true}))



router.post('/' , async (req,res) => {
    const {username, password} = req.body
    
    Users.findOne({Username: username}, async (requi,result) => {
        
    if(!result){
        return res.send('sem resultados')
    }
        const hashed = result.Password
        const isMatch = await bcrypt.compare(password, hashed)

        if( !isMatch) {

            return res.send('senha errada')
            
        }

        req.session.isAuth = true
        req.session.user = username
        res.send('')

})


})





router.get('/', (req,res) => {
    console.log(req.session.isAuth)
    res.send(req.session.isAuth)
})

router.get('/deslogar', (req,res) => {
    req.session.destroy((err) => {
        console.log(err)
    })
    res.send('voce foi deslogado')
})

router.get('/register',(req, res) => {
    res.render('register')
})

router.post('/register',async (req, res) => {
    
    const {user, pass, img} = req.body

    if(!pass == '') {
        await Users.exists({Username: user}, async (err, result) => {
            if(result) {
                res.redirect('/login/register')
            } else {
                const hashedPsw = await bcrypt.hash(pass, 12)
                await Users.create({Username: user, Password: hashedPsw})
                res.status(201).json({message: 'Usuário criado com sucesso'})
            }
        })
    } else {
        res.send('Voce precisa digitar a senha tbm')
    }

})


module.exports = router