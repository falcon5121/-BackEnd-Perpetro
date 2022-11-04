

const router = require('express').Router()

const mongoose = require('mongoose')
const Posts = require('../models/Posts')



router.get('/', async (req,res) => {
    Posts.find({}, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


router.post('/' , async (req,res) => {

    const d = new Date()

    const dia = () => {
        if(d.getDay() < 10) {
            return `0${d.getDay()}` 
        } else {
            d.getDay()
        }
    }

    const mes = () => {
        if(d.getMonth() < 10) {
            return `0${d.getMonth()}`
        } else {
            return d.getMonth()
        }
    }

    const hora = () => {
        if(d.getHours() < 10) {
            return `0${d.getHours()}`
        } else {
            return d.getHours()
        }
    }

    const min = () => {
        if(d.getMinutes() < 10) {
            return `0${d.getMinutes()}`
        } else {
            return d.getMinutes()
        }
    }

    


    const {Title, SubTitle, Content} = req.body

    if(!Title) {
        res.status(422).json({error: 'O titulo e obrigatorio!'})
    }

    const post = {
        Title,
        SubTitle,
        Content,
        Date: `${dia()}/${mes()}/${d.getFullYear()} ${hora()}:${min()}`
    }

    try {

        await Posts.create(post)
        res.status(201).json({message: 'Post criado com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

module.exports = router