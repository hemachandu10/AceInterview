import React from 'react';
import {Link} from "react-router"


function Home() {
    return ( 
        <>
            <div className="container text-center my-5 py-5">
                <div className="title my-5">
                    <h1>Welcome to AceInterview</h1>
                </div>
                <div className="content-1 my-4">
                    <p>We are here to help you ace your interviews. Our platform provides a comprehensive set of tools and resources to help you prepare for your interviews and succeed in your career.</p>
                </div>
                <div className="content-2 my-5">
                    <p>Get started by <Link to="/signup" className="nav-auth">signing up</Link> or <Link to="/login" className="nav-auth">logging in</Link> to your account.</p>
                </div>
                 
            </div>
        </>
     );
}

export default Home;