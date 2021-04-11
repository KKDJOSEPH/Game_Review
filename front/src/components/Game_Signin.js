import React, { useState } from "react";
import PropTypes from "prop-types";
import StarRating from "./Star";
import { Link } from "react-router-dom";
import "../css/Game.css";

function Games_Signin(props) {
    const [search, setGame] = useState("");

    const renderGames = () => {
        return props.game
            .filter(
                (p) =>
                    p.Name && p.Name.toLowerCase().startsWith(search.toLowerCase())
            )
            .map((p) => (
                /*<div key={p._id} className="card Game-li">*/
                <li key={p._id} className="Game-li">
                    {p.Name} (#{p._id}) <br />
                    <img
                        className="Game-img card-img-top"
                        src={`../image/${p._id}.jpg`}
                        alt={`${p.Name} (#${p._id})`}
                        title={`${p.Name} (#${p._id})`}
                    />{" "}
                    <br />
                    Type: {p.Type} <br />
                    <div>
                        <label htmlFor="position">
                            Rate this game: {" "}
                            <StarRating name = "position"/>
                        </label>
                    </div>
                    <Link to={`/evaluate/${p._id}`}> Evaluate this game </Link>
                    <br />
                </li>
                /*</div>*/
            ));
    };

    console.log("rendering Pokemon", search);

    return (
        <div className="col">
            <label htmlFor="search">
                Search for a game by name :{" "}
                <input
                    type="text"
                    value={search}
                    onChange={(evt) => setGame(evt.target.value)}
                />
            </label>
            <br />
            <ol className="Game-ol">{renderGames()}</ol>
        </div>
    );
}

Games_Signin.propTypes = {
    game: PropTypes.array,
};

export default Games_Signin;