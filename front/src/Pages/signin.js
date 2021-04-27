import React from "react";
import "../css/SignIn.css";
import { Link } from "react-router-dom";
import NavigationComponent from "../components/navbar";

function SignIn() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    return (
        <div className="bg">
            <NavigationComponent/>
            <div className="container-fluid d-flex justify-content-center" role="main">
                <div className="signcard">
                    <div className="card-header">
                        <h1 className="signHead">Sign In</h1>
                    </div>
                    <div className="card-body">
                        {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div> : ""}
                        <form action="/test/signin" method="POST">

                            <img className="signIcon"
                                src="./game_icon4.png"
                                alt="game_icon"
                                width="70"
                                height="70"
                            />
                            <div className="form-group">
                                <label htmlFor="userName">Username</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    className="form-control"
                                    placeholder="Alice"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passWord">Password</label>
                                <input
                                    type="password"
                                    id="passWord"
                                    name="passWord"
                                    className="form-control"
                                    placeholder="123abc"
                                />
                            </div>

                            <h2 className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-dark"
                                    style={{ marginTop: "10px" }}
                                    value="Sign In"
                                />
                            </h2>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
