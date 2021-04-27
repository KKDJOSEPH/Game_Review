import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/Game.css";
import {Link, useLocation} from "react-router-dom";
import { Icon } from '@iconify/react';
import playstationIcon from '@iconify-icons/cib/playstation';
import nintendoSwitch from '@iconify-icons/mdi/nintendo-switch';
import pcIcon from '@iconify-icons/ls/pc';
import mobileDevice from '@iconify-icons/akar-icons/mobile-device';
import StarRatings from 'react-star-ratings';

function Platform(platform) {
    if(platform === "Switch") return <Icon icon={nintendoSwitch} />;
    if(platform === "PC") return <Icon icon={pcIcon} />;
    if(platform === "PS4") return <Icon icon={playstationIcon} />;
    if(platform === "Mobile") return <Icon icon={mobileDevice} />;
}


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
                    <Link to={`/review/${p._id}`}>
                        <img
                            className="Game-img card-img-top"
                            src={`../image/${p._id}.jpg`}
                            alt={`${p.Name} (#${p._id})`}
                            title={`${p.Name} (#${p._id})`}
                        />{" "}
                    </Link>
                    <h1 className= "Game_Name">
                        {p.Name}
                    </h1>
                    <br />
                    <div className= "Game_Info">
                        Platform: {Platform(p.Platform1)} {Platform(p.Platform2)}<br />
                        Type: {p.Type}
                        <span className="Game_Info2">
                            <StarRatings
                                numberOfStars={5}
                                rating= {parseFloat(p.Rating)}
                                starDimension="20px"
                                starEmptyColor='grey'
                                starRatedColor={'rgb(243,69,67)'}
                                starSpacing="0"
                            />
                        </span>
                    </div>
                </li>
            ));
    };

    const location = useLocation();
    return (
        <div className="col">
            <nav className="navbar navbar-expand-lg navbar-light" role="navigation">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <Link className="navbar-brand" to="/">
                    <img
                        src="./game_icon4.png"
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