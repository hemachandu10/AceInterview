import React from 'react';
import { useState } from 'react';
import axios from "axios";

function ResumeUpload() {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);

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
            console.log(res2.data)
          

        } catch (err) {
            console.log(err);
        }

    };

    return (
        <>
            <div className="upload-box">
                <div className="container">
                    <form onSubmit={handleSubmit} action="http://localhost:8080/api/resumeUpload" method="post" encType="multipart/form-data">
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button type='submit'>Upload</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResumeUpload;