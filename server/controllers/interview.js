const InterviewAnalysis=require('../models/InterviewAnalysis')
const InterviewSession=require('../models/InterviewSession')
const Message=require("../promt/Interviewfeedback")
const GroqService=require('../services/groqService')

async function getQuestions(user_id) {
    let result = await InterviewAnalysis.findOne({ userId: user_id });

    const allQuestions = [
        ...result.hrQuestions.map(q => ({
            question_type: "HR",
            question: q,
            answer: "",
            feedback: "",
            score: 0,
        })),

        ...result.technicalQuestions.map(q => ({
            question_type: "Technical",
            question: q,
            answer: "",
            feedback: "",
            score: 0,
        })),

        ...result.projectQuestions.map(q => ({
            question_type: "Project",
            question: q,
            answer: "",
            feedback: "",
            score: 0,
        }))
    ];

    const session = await InterviewSession.create({
        userId: user_id,
        questions: allQuestions,
        totalQuestions:allQuestions.length
    });

    return session;
}

exports.getSession_id=async (req, res) => {
    const document = await getQuestions(req.user.id);
    let firstDocument= await InterviewSession.findById(document._id);
    let firstQusetion= firstDocument.questions[0];
    res.json({
    "sessionId": document._id,
    "questionType":firstDocument.questionType,
    "question": firstQusetion,
    "questionNumber": 1,
    "totalQuestions": document.totalQuestions,
    });
}

exports.getNextQuestion=async (req,res)=>{  
    //console.log(req.body)
    const document = await InterviewSession.findById(req.body.sessionId);
    const currentQuestion =document.questions[Number(req.body.questionNumber) - 1];
    //console.log(currentQuestion)
    res.send({
        sessionId:req.body.sessionId,
        questionNumber:req.body.questionNumber,
        question_type:currentQuestion.question_type,
        question:currentQuestion.question,
        totalQuestions:document.totalQuestions
    });
    
}

exports.saveAnswer=async (req,res)=>{
    //console.log(req.body)
    const { sessionId, questionNumber, answer } = req.body;
    const session = await InterviewSession.findById(sessionId);
    if (!session) {
        return res.status(404).json({
            message: "Interview session not found"
        });
    }
    session.questions[questionNumber - 1].answer = answer;
    await session.save();
    res.json({
        message: "Answer saved successfully"
    });
}

exports.getFeedback=async (req,res)=>{
    let Document= await InterviewSession.findById(req.body.sessionId);

    if (!Document) {
        return res.status(404).json({
            message: "Interview session not found"
        });    
    }
    //console.log(Document.questions)
    let feedback=await GroqService(Message(Document.questions))
    if (typeof feedback === "string") {
    feedback = JSON.parse(feedback);
    }
    //console.log(feedback);
    for (let i = 0; i < Document.questions.length; i++) {
        Document.questions[i].feedback =
            feedback.questions[i].feedback;

        Document.questions[i].score =
            feedback.questions[i].score;

        Document.questions[i].idealAnswer =
            feedback.questions[i].idealAnswer;    
    }
    Document.overallReport = feedback.overallReport;
    Document.status = "completed";

    await Document.save();
    res.send({questions:Document.questions,overallReport:Document.overallReport})

}