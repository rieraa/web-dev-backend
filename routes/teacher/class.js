const express = require('express')
const router = express.Router()
const list = require('../../route_handler/teacher/class')


router.post('/class/list', list.list)
router.post('/class/delete', list.delete)
router.post('/class/add', list.add)
router.post('/classinfo/list', list.classinfo)
router.post('/classinfo/adds', list.adds)
router.post('/classinfo/delete',list.deletes)
router.get('/classinfo/getstudents',list.getstudents)
router.post('/classinfo/modifyclass',list.modifyclass)
module.exports = router