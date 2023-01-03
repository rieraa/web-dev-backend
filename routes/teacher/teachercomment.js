const express=require('express')
const router=express.Router()
const comment=require('../../route_handler/teacher/teachercomment')

router.post('/records/comment',comment)

module.exports=router