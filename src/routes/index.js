const express = require('express')

const doc = require('./doc')
const { connectTab } = require('../../sheets')

const router = express.Router()

router.use('/doc', doc.router)
router.use('/users', connectTab('Users'))

module.exports.router = router
