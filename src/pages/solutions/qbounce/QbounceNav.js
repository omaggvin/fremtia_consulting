import { Outlet, Link } from "react-router-dom";

export default function QbounceNav() {
    return (
        <>
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
                    
                    
                </div>
            </div>
            <Outlet />
        </>
    );
}
