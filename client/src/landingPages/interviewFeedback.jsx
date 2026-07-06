import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios'

function InterviewFeedback() {
    let sessionId = localStorage.getItem("interviewSessionId");
    const token=localStorage.getItem("token");
    let [feedbackData, setFeedbackData] = useState(null);
    const [loading, setLoading] = useState(false);
    async function getFeedback() {
        setLoading(true);
         let result=await axios.post(
            "https://aceinterview-ce2c.onrender.com/api/interview/feedback",
            {
                sessionId:sessionId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        //console.log(result.data)
        localStorage.setItem("feedbackData",JSON.stringify(result.data))
        setFeedbackData(JSON.parse(localStorage.getItem("feedbackData")));
        setLoading(false);
    }
    useEffect(() => {
        getFeedback()
    }, []);
        
    return ( 
        <>
            <div className="title text-center mt-5 mb-3">
                <h1>your latest Feedback</h1>
            </div>
            
            {   
                loading
                 &&
                <div className="text-center mt-5">
                    <p>Loading...</p>
                </div>  
            }
            {
                !loading && feedbackData 
                && 
                (
                    <div className="container mt-5 mb-5 pb-5">
                        <h3>Questions:</h3>
                        {feedbackData.questions.map((q, index) => (
                            <div key={index}>
                                <p><strong>Question {index+1}:</strong> {q.question}</p>
                                <p><strong>Your Answer:</strong> {q.answer}</p>
                                <p><strong>Feedback:</strong> {q.feedback}</p>
                                <p><strong>Score:</strong> {q.score}</p>
                                <p><strong>Ideal Answer:</strong> {q.idealAnswer}</p>
                                <hr/>
                            </div>
                        ))}
                        <h3>Overall Report:</h3>
                        <p><strong>Communication:</strong> {feedbackData.overallReport.communication}</p>
                        <p><strong>Technical:</strong> {feedbackData.overallReport.technical}</p>
                        <p><strong>Confidence:</strong> {feedbackData.overallReport.confidence}</p>
                        <hr/>
                        <h4>Strengths:</h4>
                        <ul>
                            {feedbackData.overallReport.strengths.map((s, index) => (
                                <li key={index}>{s}</li>
                            ))}
                        </ul>
                        <hr/>
                        <h4>Improvements:</h4>
                        <ul>
                            {feedbackData.overallReport.improvements.map((i, index) => (
                                <li key={index}>{i}</li>
                            ))}
                        </ul>
                        <p><strong>Summary:</strong> {feedbackData.overallReport.summary}</p>
                    </div>
                )
            }
        </>
     );
}

export default InterviewFeedback;