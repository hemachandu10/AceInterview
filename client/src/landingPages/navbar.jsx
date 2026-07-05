import React from 'react';
import { Link } from "react-router"
import { useNavigate } from 'react-router';
import './style.css'

function Navbar() {
    const navigate=useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand nav-text" to="#">AceInterview</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                localStorage.getItem("token") &&
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-text" to="/dashboard">dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-text ms-2" to="/interviewStart">interview</Link>
                                    </li>
                                    <li className="nav-item ms-2">
                                        <Link className="nav-text" to="/interviewFeedback">feedback</Link>
                                    </li>
                                </>
                            }
                        </ul>
                        
                            {localStorage.getItem("token") ? (
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("currQuestion");
                                        localStorage.removeItem("interviewSessionId");
                                        localStorage.removeItem("interviewStarted");
                                        localStorage.removeItem("feedbackData");
                                        localStorage.removeItem("interviewEnded");
                                        localStorage.removeItem("newUploadDone");
                                        navigate("/")
                                        window.location.reload();

                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <span className="navbar-text mx-2">
                                        <Link className="nav-text" to="/signup">SignUp</Link>
                                    </span>

                                    <span className="navbar-text">
                                        <Link className="nav-text" to="/login">Login</Link>
                                    </span>
                                </>
                            )}
                      

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;