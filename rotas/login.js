
const router = require('express').Router()
const session = require('express-session')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Posts = require('../models/Posts')
const Users = require('../models/Users')
const MongoDBSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')
require('dotenv/config')
const express = require('express')


router.use(bodyParser.urlencoded({
    extended: false
}))

const mongoURI = 'mongodb+srv://fxemanuel:ZWcGohgoohKvMZTR@perpetrodb.tillkcv.mongodb.net/Postagens?retryWrites=true&w=majority'

// const upload = require('../middleware/upload').upload

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
        req.session.img = result.Img
        res.send('')

})


})





router.get('/', (req,res) => {
    res.send(req.session)
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


const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
        cb(null, path.join('./rotas/uploads'))
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage})


router.post('/register',upload.single('image'), async (req, res) => {
    
    const {user, pass, img } = req.body

    const content = {
        name: user,
        pass: pass,
        img: {
            data: fs.readFileSync(path.join('./rotas/uploads/' + req.file.filename)),
            contentType: 'image/jpeg'
        }
    }



    if(!pass == '') {
        await Users.exists({Username: user}, async (err, result) => {
            if(result) {
                res.redirect('/login/register')
            } else {
                const hashedPsw = await bcrypt.hash(pass, 12)
                await Users.create({Username: user, Password: hashedPsw, Img:content.img})
                res.status(201).json({message: 'Usuário criado com sucesso'})
            }
        })
    } else {
        res.send('Voce precisa digitar a senha tbm')
    }

})


router.put('/updateImg', async (req,res) => {
  console.log(req.body)
})

module.exports = router
