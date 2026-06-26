import React from 'react';
import { Link } from "react-router"
import { useNavigate } from 'react-router';

function Navbar() {
    const navigate=useNavigate();
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">AceInterview</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                        </ul>
                        
                            {localStorage.getItem("token") ? (
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        navigate("/")
                                        window.location.reload();

                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <span className="navbar-text mx-2">
                                        <Link className="nav-link" to="/signup">SignUp</Link>
                                    </span>

                                    <span className="navbar-text">
                                        <Link className="nav-link" to="/login">Login</Link>
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