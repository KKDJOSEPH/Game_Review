import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/Game.css";
import {Link, useLocation} from "react-router-dom";


function Games(props) {
    const [search, setGame] = useState("");
    const renderGames = () => {
        return props.game
            .filter(
                (p) =>
                    (p.Type && p.Type.toLowerCase().startsWith(search.toLowerCase())) || (p.Name && p.Name.toLowerCase().startsWith(search.toLowerCase()))
            )
            .map((p) => (
                    <li key={p._id} className="Game-li">
                        {p.Name} (#{p._id}) <br />
                        <img
                            className="Game-img card-img-top"
                            src={`../image/${p._id}.jpg`}
                            alt={`${p.Name} (#${p._id})`}
                            title={`${p.Name} (#${p._id})`}
                        />{" "}
                        <br />
                        Rating: {p.Rating} <br />
                        Type: {p.Type} <br />
                        <Link to={`/review/${p._id}`}> Check Comments </Link>
                        <br />
                    </li>
            ));
    };

    const location = useLocation();

    return (
        <div className="col">
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                &nbsp; &nbsp; &nbsp;
                <Link className="navbar-brand" to="/">
                    <img
                        src="./game_icon.png"
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
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li className="nav-item">
                            <Link
                                className={
                                    "nav-link" + (location.pathname === "/newgame" ? " active" : "")
                                }
                                to="/newgame"
                            >
                                Add a New Game
                            </Link>
                        </li>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <li className="nav-item">
                            Search :{" "}
                            <input
                                type="text"
                                value={search}
                                onChange={(evt) => setGame(evt.target.value)}
                            />

                        </li>
                    </ul>
                </div>
            </nav>
            <br />
            <ol className="Game-ol">{renderGames()}</ol>
        </div>
    );
}

Games.propTypes = {
    game: PropTypes.array,
};

export default Games;
