const express = require('express')
const router = express.Router()
const classlisthander = require('../../route_handler/class/classlist')

router.get('/records/class',classlisthander)

module.exports = router