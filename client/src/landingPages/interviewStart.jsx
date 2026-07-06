import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function InterviewStart() {
    const navigate = useNavigate();
    const token=localStorage.getItem("token");
    let sessionId = localStorage.getItem("interviewSessionId");
    const [answer,setAnswer]=useState("")
    const [end, setEnd] = useState(localStorage.getItem("interviewEnded") === "true");
    const [currQuestion,setCurrQuestion]=useState({})
    const [loading, setLoading] = useState(true);
   
    async function getQuestion() {
        let result=await axios.post(
            "http://localhost:8080/api/interview/start",
            {
                sessionId:sessionId,
                questionNumber: Number(currQuestion?.questionNumber ?? 0) + 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        localStorage.setItem("currQuestion", JSON.stringify(result.data))
        setCurrQuestion(result.data);
        
        
    }

    async function pushAnswer() {
         let result=await axios.post(
            "http://localhost:8080/api/interview/answer",
            {
                sessionId:sessionId,
                questionNumber: Number(currQuestion?.questionNumber ?? 0),
                answer:answer
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

    useEffect(() => {
        async function initialize() {
            localStorage.setItem("interviewStarted", "true");

            const saved = localStorage.getItem("currQuestion");

            if (saved) {
                setCurrQuestion(JSON.parse(saved));
            } else {
                await getQuestion();
            }
            setLoading(false);
        }

        initialize();
    }, []);
    
    async function reTest() {
        localStorage.setItem("interviewEnded", "false");
        setLoading(true)
        await getQuestion();
        setLoading(false)
        setEnd(false);
    }
   

    async function handleSubmit(e){
        e.preventDefault()
        if(Number(currQuestion.questionNumber)==currQuestion.totalQuestions){
            await pushAnswer()
            localStorage.setItem("interviewEnded","true")
            localStorage.setItem("currQuestion", JSON.stringify({}))
            setEnd(true)
            navigate('/interviewFeedback')
        }else{
            await pushAnswer()
            await getQuestion()
            setAnswer("")
        }    
    }
    if (end) {
        return (
            <>
                <div className="container text-center mt-5 pt-5">
                    <h3 className="mb-5">Interview Ended. what to take reTest?</h3>
                    <button onClick={reTest} className="btn btn-primary">
                        take retest
                    </button>
                </div>
            </>
        )
    }
    else if(loading){
        return <div>Loading...</div>;
    }
    else{
        return ( 
        <>
            <div className="container text-start mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-9">
                        <p>Question Number : {currQuestion.questionNumber}</p>
                        <p>Question Type : {currQuestion.question_type}</p>
                        <p>Question : {currQuestion.question}</p>
                        <p>type your answer below:</p>
                        <form onSubmit={handleSubmit}>
                            <textarea rows="6" cols='100' value={answer} onChange={(e)=>{setAnswer(e.target.value)}} />
                            <div className="submit-box mt-3 text-center">
                                <button type='submit' className="btn btn-primary">submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </>
     );
    }
}

export default InterviewStart;












