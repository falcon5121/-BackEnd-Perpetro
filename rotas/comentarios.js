const express = require('express')
const router = express.Router()

router.get('/comentarios/:postid', (req,res) => {
    res.json({
        conteudo: 'Parabens, Gostei bastante',
        autor: 'desconhecido'
    })
})

module.exports = router