require('dotenv').config()
const ConnectDB=require("./config/db")
const Resume=require('./models/resume')
const InterviewAnalysis=require('./models/InterviewAnalysis')
const InterviewSession=require('./models/InterviewSession')
//connecting database
ConnectDB()

async function DataClear() {
    let result=await Resume.deleteMany({}) 
        console.log("resume cleared")
        result=await InterviewAnalysis.deleteMany({})
        console.log("InterviewAnalysis cleared")
        result=await InterviewSession.deleteMany({})
        console.log("InterviewSession cleared")
}
DataClear()