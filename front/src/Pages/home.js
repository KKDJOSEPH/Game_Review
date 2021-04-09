import React from "react";
import "../css/style.css"
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="bg">
            <div className="menu">
                <div className="corner">
                    <Link to="/signup">
                        <button className="btn btn-primary button" role="button">
                            Sign Up
                        </button>
                    </Link>
                    <Link to="/signin">
                        <button className="btn btn-primary button" role="button">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;