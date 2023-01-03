const express = require('express')
const router = express.Router()
const codeHandler = require('../../route_handler/student/code')

router.post('/runcode', codeHandler.code)
router.post('/submit',codeHandler.submitcode)

module.exports = router