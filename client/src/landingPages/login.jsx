import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    function handleFormChange(event) {
        let field = event.target.name
        let value = event.target.value
        //console.log(field,value)
        formData[field] = value
        setFormData((prevalue) => {
            return { ...formData }
        })

    }
    async function handleSubmit(event) {
        event.preventDefault()
        //console.log(formData)
        try {
            let result = await axios.post("https://aceinterview-ce2c.onrender.com/api/auth/login", formData);
            //console.log(result)
            if (result.data.token) {
                localStorage.setItem("token", result.data.token);
                navigate("/dashboard");
            }
        } catch (err) {
            alert(err.response?.data?.message);
        }
        setFormData({
            email: '',
            password: '',
        })
    }

    return (
        <>
            <div className="container my-5">
                <div className="title my-3">
                    <h2>Login here</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email address</label>
                        <input type="email" onChange={handleFormChange} value={formData.email} name='email' className="form-control" id="email" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" onChange={handleFormChange} value={formData.password} name='password' className="form-control" id="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>

    );
}

export default Login;
