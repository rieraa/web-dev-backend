const express = require('express')
const router = express.Router()
const que= require('../../route_handler/teacher/question')

router.post('/question/add',que.add)
router.get('/question/list',que.list)
router.post('/question/publish',que.publish)
router.post('/question/delete',que.delete)
router.post('/question/deleteClassQuestion',que.deleteQuestion)
module.exports = router