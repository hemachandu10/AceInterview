import React from 'react';
import ResumeUpload from './resumeUpload';
import InterviewStart from './interviewStart';
import { formToJSON } from 'axios';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const newUploadDone = localStorage.getItem("newUploadDone")
    const [dashreload, setDashReload] = useState(false)



    async function handleStart() {
        try {
            const result = await axios.get(
                "https://aceinterview-ce2c.onrender.com/api/interview/getSession_id",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            localStorage.setItem("interviewSessionId", result.data.sessionId);
            localStorage.setItem("interviewStarted", "true")
            localStorage.setItem("newUploadDone", false)
            localStorage.setItem("interviewEnded", "false");
            localStorage.removeItem("currQuestion");
            navigate('/interviewStart')
        } catch (error) {
            console.error(error);
        }
    }

    if (localStorage.getItem("interviewStarted") == "true") {
        return (
            <>
                <div className="container text-center mt-5 pt-5">
                    <h2>want to upload another resume?</h2>
                    {<ResumeUpload setDashReload={setDashReload} />}
                    {
                        newUploadDone === "true" && (
                            <div className="text-center mt-5">
                                <button className="btn btn-primary" onClick={handleStart}>
                                    start Interview
                                </button>
                            </div>
                        )

                    }
                </div>

            </>
        )
    }

    else {
        return (
            <>

                {<ResumeUpload setDashReload={setDashReload} />}
                {
                    newUploadDone === "true" && (
                        <div className="text-center mt-5">
                            <button className="btn btn-primary" onClick={handleStart}>
                                start Interview
                            </button>
                        </div>
                    )

                }

            </>
        );
    }
}

export default Dashboard;