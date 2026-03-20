const express = require("express")

const app = express()
const main = require("./config/db")

const cookieParser = require('cookie-parser');
const authRouter = require("./routes/userAuth")
const redisClient = require("./config/redis")
const problemRouter = require('./routes/problemCreator')
const submitRouter = require('./routes/submit')
const aiRouter = require('./routes/aiChatting')
const cors = require('cors')
require('dotenv').config({ path: '../.env' });

app.use(cors({
    origin: 'https://codequick-v2-rhha.onrender.com',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser());
app.use('/user', authRouter)
app.use('/problem', problemRouter)
app.use('/submission', submitRouter)
app.use('/ai', aiRouter)

const initializeConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()])
        console.log("Db is connected")
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server listening at port number: " + 3000);
        })

    }
    catch (err) {
        console.log("Error : " + err.message)
    }
}

initializeConnection()

// main().then(()=>{
//     app.listen(process.env.PORT, ()=>{
//         console.log("Server listening at port number: "+process.env.PORT);
//     })
// })
// .catch((err)=>{
//     console.log("Error : "+err)
// })


