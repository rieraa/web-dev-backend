const express=require('express')
const router=express.Router()
const sflist=require('../../route_handler/teacher/studentfinish')

router.post('/records/classproblem',sflist)

module.exports=router