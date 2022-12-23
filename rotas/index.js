
const router = require('express').Router()


router.use('/', require('./postagens'))
router.use('/', require('./comentarios'))
router.use('/', require('./login'))


module.exports = router