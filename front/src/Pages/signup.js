import React from "react";
import "../css/SignUp.css";

import { Link } from "react-router-dom";
function SignUp() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");

    return (
        <div className="bg">
            <div className="container-fluid d-flex justify-content-center">
                <div className="signcard">
                    <div className="card-header">
                        <h3>Sign Up</h3>
                    </div>
                    <div className="card-body">
                        {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div> : ""}
                        <form action="/test/signup" method="POST">
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

                            <div className="form-group" type="submit">
                                <label htmlFor="passWord2">Verify Password</label>
                                <input
                                    type="password"
                                    id="passWord2"
                                    name="passWord2"
                                    className="form-control"
                                    placeholder="123abc"
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-dark"
                                    style={{ marginTop: "10px" }}
                                    value="Sign Up"
                                />
                            </div>
                            <div className="form-group">
                                Already an user? <Link to="/signin">Sign In</Link>
                                <br />
                                <Link to="/">Cancel and return home</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
