const express = require('express')
const router = express.Router()
const edit= require('../../route_handler/student/editInfo')

router.post('/editinfo',edit.editInfo)
router.get('/studentinfo', edit.searchInfo)

module.exports = router
