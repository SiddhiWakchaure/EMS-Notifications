const express = require("express")
const router = new express.Router()
const genNotification = require("../models/genNotification.js")

router.post('/genNotification/add', async (req, res)=>{
    const notification = new genNotification(req.body)

    try{
        await notification.save()
        res.status(201).send(notification)
    }catch(e){
        res.status(400).send(e)
    }

})

router.get('/allNotifications', async (req, res)=>{   
    try{
        const notifications = await genNotification.find({})
        res.send(notifications)
    }catch(e){
            res.status(500).send(e)
    }
    
})

router.get('/notification/:id', async (req, res)=>{
    const _id = req.params.id

    try{
        const notification = await genNotification.findById(_id)
        if(!notification){
            return res.status(404).send()
        }
        res.send(notification)
    }catch(e){
        res.status(500).send()
    }

})

module.exports = router