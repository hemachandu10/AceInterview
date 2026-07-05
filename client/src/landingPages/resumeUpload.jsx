import React from 'react';
import { useState } from 'react';
import axios from "axios";


function ResumeUpload({setDashReload}) {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res1 = await axios.post(
                "http://localhost:8080/api/resumeUpload/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("uploaded successful");
            const res2 = await axios.get(
                "http://localhost:8080/api/ai/analysis",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("skills extraction successful");
            //localStorage.setItem("interviewData",true);
            setDashReload((preData)=>{
                return true
            })
            localStorage.setItem("newUploadDone",true)
            setLoading(false);
          

        } catch (err) {
            console.log(err);
            setLoading(false);
        }

    };

    return (
        <>
            <div className="upload-box mt-5 pt-5 mb-5 text-center">
                <div className="container">
                    <form onSubmit={handleSubmit} action="http://localhost:8080/api/resumeUpload" method="post" encType="multipart/form-data">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {
                            loading 
                            && 
                            <div className="loading my-4 text-center">
                                <p>Uploading...</p>
                            </div>
                        }
                        {   
                            !loading 
                            && 
                            <button type='submit' className="btn btn-primary mx-2">Upload</button>                            
                        }
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResumeUpload;