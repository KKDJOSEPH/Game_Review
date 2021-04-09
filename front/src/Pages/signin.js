import React from "react";
import "../css/SignIn.css";
import { Link } from "react-router-dom";

function SignIn() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    return (
        <div className="bg">
            <div className="container-fluid d-flex justify-content-center">
                <div className="signcard">
                    <div className="card-header">
                        <h3>Sign In</h3>
                    </div>
                    <div className="card-body">
                        {error ? <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div> : ""}
                        <form action="/test/signin" method="POST">
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

                            <div className="form-group">
                                <input
                                    type="submit"
                                    className="btn btn-dark"
                                    style={{ marginTop: "10px" }}
                                    value="Sign In"
                                />
                            </div>
                            <div className="form-group">
                                Not an user? <Link to="/signup">Sign up here</Link>
                                <br/>
                                <Link to="/">Cancel and return home</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
