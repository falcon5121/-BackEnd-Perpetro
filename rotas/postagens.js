

const router = require('express').Router()

const mongoose = require('mongoose')
const Posts = require('../models/Posts')



router.get('/', async (req,res) => {

    const postagens = mongoose.model('posts', Posts)

    postagens.find({}, (err, result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })


    // Posts.find({}, (err, result) => {
    //     if(err) {
    //         res.send(err)
    //     } else {
    //         res.send(result)
    //     }
    // })
})

router.get('/publis/:id', async (req,res) => {

    const postagens = mongoose.model('posts', Posts)

    postagens.find({}, (err, result) => {
        res.send(result[req.params.id])
    })


    // Posts.find({}, (err, result) => {
    //     res.send(result[req.params.id])
    // })
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

    const Postagem = mongoose.model('post', Posts)

    const doc = new Postagem({
        tittle: req.body.Title,
        subTittle: req.body.SubTitle,
        content: req.body.Content,
    })

    try {
        await doc.save()
        res.send('Post criado com sucesso!')
    }
    catch (e){
        res.send(e)
    }
        
    //     console.log('Criou o post, ou espero que tenha criado')
    

        // const postar = {
        //     Title, SubTitle, Content
        // }

        // try {
        //     await postar.save()
        // }
        // catch (error){
        //     res.send(error)
        // }

        // await Posts.create(postar)
        // try {
        //     await Posts.save()
        // } catch (e) {
        //     res.send(e)
        // }

    

    // if(!Title) {
    //     res.status(422).json(
    //         {error: 'O título é obrigatório!'}
    //     )
    // }

    // const post = {
    //     Title,
    //     SubTitle,
    //     Content,
    //     Date:`${dia()}/${mes()}/${d.getFullYear()} ${hora()}:${min()}`
    // }

    //     res.setHeader('Title', Title)
    //     await Posts.create(post)
    //     res.status(201).send('Post criado com sucesso!')
        
        // res.status(201).json({message: 'Post criado com sucesso!'})
        // res.writeHead(201 ,['Post criado com sucesso!'],[req.header])
        // res.writeHead(201,'Não foi possível criar o post!')
        // res.redirect('/')

    

    // if(!Title) {
    //     res.status(422).json({error: 'O titulo e obrigatorio!'})
    // }

    // const post = {
    //     Title,
    //     SubTitle,
    //     Content,
    //     Date: `${dia()}/${mes()}/${d.getFullYear()} ${hora()}:${min()}`
    // }

    // try {

    //     await Posts.create(post)
    //     res.status(201).json({message: 'Post criado com sucesso!'})

    // } catch (error) {
    //     res.status(500).json({error: error})
    // }

})

module.exports = router