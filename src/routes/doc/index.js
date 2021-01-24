const express = require('express')
const controller = require('./controller')

const router = express.Router()

const getInfo = (_, res) => res.status(200).send(controller.getInfo())

router.get('/info', getInfo)

module.exports.router = router
