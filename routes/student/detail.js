const express = require('express')
const router = express.Router()
const detail = require('../../route_handler/student/detail')

router.post('/record',detail)

module.exports = router