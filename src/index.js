require("./db/mongoose.js")
const express = require("express")
const notificationRouter = require("./routers/notification")
const userRouter = require("./routers/user.js")
const genNotificationRouter = require("./routers/genNotification.js")

const app = express()
const port = process.env.port || 3000

app.use(express.json())
app.use(notificationRouter)
app.use(userRouter)
app.use(genNotificationRouter)

app.listen(port , ()=>{
    console.log("Server is up on port "+port)
})