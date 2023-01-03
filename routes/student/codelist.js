const express = require('express')
const router = express.Router()
const codelist = require('../../route_handler/student/codelist')

router.post('/codelist', codelist)


module.exports = router