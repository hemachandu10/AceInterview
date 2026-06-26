const express = require('express')
const router = express.Router()
const groq = require('../config/groq')
const mongoose = require('mongoose')
const InterviewAnalysis=require('../models/InterviewAnalysis')
const authMiddleware = require("../middlewares/authMiddleware")
const Resume = require('../models/Resume')

async function main(resume_text) {
    const chatCompletion = await getGroqChatCompletion(resume_text);
    // Print the completion returned by the LLM.
    //console.log(chatCompletion.choices[0]?.message?.content || "");
    return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(resume_text) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                    You are an experienced software engineering interviewer.

                    Analyze the user's resume.

                    IMPORTANT:
                    - Return ONLY a valid JSON object.
                    - Do NOT wrap the JSON in \`\`\`json or \`\`\` code fences.
                    - Do NOT include any explanations, notes, or extra text.
                    - The response must start with '{' and end with '}'.
                    - Every field must always be present.

                    Use this exact JSON structure:

                    {
                    "skills": [],
                    "projects": [],
                    "technologies": [],
                    "hrQuestions": [],
                    "technicalQuestions": [],
                    "projectQuestions": []
                    }

                    Rules:
                    - Extract all technical skills.
                    - Extract all projects.
                    - Extract all technologies mentioned.
                    - Generate exactly 5 HR questions.
                    - Generate exactly 10 technical questions.
                    - Generate exactly 5 project-specific questions.
                    `,
            },
            {
                role: "user",
                content:resume_text,
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
}


router.get("/", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    const resume_text=resume.extractedText;
    //console.log(resume_text)
    const result = await main(resume_text); // string
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
      userId: req.user.id,
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


