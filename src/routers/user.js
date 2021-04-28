const express = require("express")
const User = require("../models/User.js")
const router = new express.Router()

router.post('/users', async(req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
        // console.log(e)
    }
})
router.get("/get_users", async(req, res)=>{
    try{
        const user = await User.find({})
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router