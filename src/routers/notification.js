const express = require("express")
const Notification = require("../models/Notication.js")
const router = new express.Router()
const User = require("../models/User.js")

router.post('/add_notifications', async (req, res) => {
    const {title, body, users} = req.body

    const notification = new Notification({title, body, users})

    try{
        await notification.save()
        res.status(201).send(notification)
    }catch(e){
        res.status(500).send(e)
        console.log(e)
    }

    users.forEach(async (userId)=>{

        try{
            const user = await User.findById(userId)
            if(!user){
                console.log("Uuser doesn't exist")
            }
            user.notifications.push(notification._id)
            await user.save()
            //console.log(user)

        }catch(e){  
            res.status(500).send()
        }

    })

})

router.patch('/update_notifications', async(req, res)=>{

    const updates = Object.keys(req.body)//This gives an array of properties eg. ['title', 'body']
    const index = updates.indexOf("_id")
    updates.splice(index,1)
    const allowedupdates =  ['title', 'body', 'users']
    const isValidOperation = updates.every((update)=> allowedupdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error : "Invalid Update! Preferably check the entered fields of updation."})
    }

    
    try{
        const notification = await Notification.findByIdAndUpdate(req.body._id, req.body, {new : true, runValidators : true})
        if(!notification){
            res.status(404).send()
        }
        await notification.save()
        res.send(notification)

    }catch(e){
        res.status(500).send()
    }
})


router.delete("/delete_notifications", async(req, res)=>{

    try{
        const id = req.body._id
        const notification = await Notification.findById(id)
        if(!notification){
            res.status(404).send("Notification not found")
        }
        const usersArray = notification.users
        //const notification = await Notification.findByIdAndDelete(id)
        res.send(notification)

        usersArray.forEach(async(userId)=>{

            try{
                const user = await User.findById(userId)
                if(!user){
                    res.status(404).send()
                }
                const index = user.notifications.indexOf(id)
                user.notifications.splice(index,1)
                await user.save()
            }catch(e){
                res.status(500).send()
            }
        })

    }catch(e){
        res.status.send(500)
    }
})

module.exports = router