const express=require('express')
const router = express.Router();
const authMiddleware=require("../middlewares/authMiddleware")
const interviewController=require('../controllers/interview')



router.get("/getSession_id", authMiddleware, interviewController.getSession_id);

router.post('/start',authMiddleware,interviewController.getNextQuestion)

router.post('/answer',authMiddleware,interviewController.saveAnswer)

router.post("/feedback",authMiddleware,interviewController.getFeedback)

module.exports=router