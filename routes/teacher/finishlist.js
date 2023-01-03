const express=require('express')
const router=express.Router()
const finishlist=require('../../route_handler/teacher/finishlist')

router.post('/records/list',finishlist)

module.exports=router