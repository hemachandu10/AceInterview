const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const InterviewAnalysis=require('../models/InterviewAnalysis')
const authMiddleware = require("../middlewares/authMiddleware")
const Resume = require('../models/Resume')
const GroqService=require('../services/groqService')
const Message=require("../promt/resumeAnalyse")


router.get("/", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    const resume_text=resume.extractedText;
    //console.log(resume_text)
    const result=await GroqService(Message(resume_text))
    const data = JSON.parse(result); // object

    await InterviewAnalysis.create({
      userId: req.user.id,
      skills: data.skills,
      projects: data.projects,
      technologies: data.technologies,
      hrQuestions: data.hrQuestions,
      technicalQuestions: data.technicalQuestions,
      projectQuestions: data.projectQuestions,
    });

    res.send({
      skills: data.skills,
      projects: data.projects,
      technologies: data.technologies,
      hrQuestions: data.hrQuestions,
      technicalQuestions: data.technicalQuestions,
      projectQuestions: data.projectQuestions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

module.exports = router


