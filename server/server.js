require('dotenv').config()
const UserRoutes=require('./routers/authentication')
const ResumeUpload=require('./routers/resumeUpload')
const GroqaiRouter=require('./routers/groqai')
// const groq=require('./config/groq')
// console.log(process.env.GROQ_API_KEY)
// console.log(groq)
const ConnectDB=require('./config/db')
//connecting database
ConnectDB()

const express=require('express')
const app=express()
const cors = require("cors");

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("heiii")
})
app.use("/api/auth",UserRoutes);
app.use("/api/resumeUpload",ResumeUpload)
app.use('/api/ai/analysis',GroqaiRouter)

PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is working on localhost:${PORT}/`)
})