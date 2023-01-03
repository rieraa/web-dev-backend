const express=require('express')
const router=express.Router()
const review=require('../../route_handler/teacher/recordreview')

router.post('/records/review',review)
module.exports=router