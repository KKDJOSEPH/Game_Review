import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/Game.css";

function Games(props) {
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
                        Rating: {p.Rating} <br />
                        Type: {p.Type} <br />
                        <div>
                            <label htmlFor="position">
                                Rate this game: {" "}
                                <select name="position" id={`position${p._id}`}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                        </div>
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

Games.propTypes = {
    game: PropTypes.array,
};

export default Games;