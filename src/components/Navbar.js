import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            {/* 
    create a navbar and style it in this file. if you use a liberary remember to import it and explain it below.
    
    */}
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary
            ">
                <div className="container-fluid">
                    

                    <div className="navbar-nav">
                    <Link className="navbar-brand" to="/">
                        <b>Fremtia Consulting</b>
                    </Link>
                        <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/"
                        >
                            Home
                        </Link>
                        <Link className="nav-link" to="/qbounce">
                            Qbounce
                        </Link>
                    </div>
                
                </div>
            </nav>
        </>
    );
}
