const express = require('express')
const router = express.Router()
const infoHandler = require('../../route_handler/user/userinfo')

router.get('/userinfo', infoHandler.getUserInfo)

module.exports = router