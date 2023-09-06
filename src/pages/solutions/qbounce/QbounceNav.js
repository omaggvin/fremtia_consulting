import { Outlet, Link } from "react-router-dom";

export default function QbounceNav() {
    return (
        <>
            {/*
            make the subnavbar for qbounce here.
            -history
            -height calculator
            -info
            it is bellow:
            */}
            <div className="container secnav">
                
                <div className="row">
                    <Link className="navbar-brand col-3 " to="/qbounce">
                        <b>QBounce</b>
                    </Link>
                    <div className="col">
                        <Link
                            to="/qbounce"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            Info
                        </Link>
                    </div>
                    <div className="col">
                        <Link
                            to="/qbounce/calculator"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}>
                        Calculator
                        </Link>
                    </div>
                    <div className="col">
                        <Link
                            to="/qbounce/history"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            History
                        </Link>
                    </div>
                    
                </div>
            </div>
            <Outlet />
        </>
    );
}
