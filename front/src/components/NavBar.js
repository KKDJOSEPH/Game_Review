import { Link, useLocation } from "react-router-dom";
import logo from "./game_icon4.png"
function NavigationComponent() {
    const location = useLocation();
    console.log("Render NavigationComponent", location);

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" role="navigation">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link className="navbar-brand" to="/">
                    <img
                        src={logo}
                        alt="game_icon"
                        width="50"
                        height="50"
                    />
                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                    Game Review
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li className="nav-item">
                            <Link
                                className={
                                    "nav-link" + (location.pathname === "/" ? " active" : "")
                                }
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li className="nav-item">
                            <Link
                                className={
                                    "nav-link" + (location.pathname === "/home" ? " active" : "")
                                }
                                aria-current="page"
                                to="/home"
                            >
                                Games
                            </Link>
                        </li>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li className="nav-item">
                            <Link
                                className={
                                    "nav-link" + (location.pathname === "/signup" ? " active" : "")
                                }
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </li>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li className="nav-item">
                            <Link
                                className={
                                    "nav-link" + (location.pathname === "/signin" ? " active" : "")
                                }
                                to="/signin"
                            >
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>
        </nav>
    );
}
export default NavigationComponent;
