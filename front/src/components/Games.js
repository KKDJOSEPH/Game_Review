import React, { useState } from "react";
import PropTypes from "prop-types";
import "../css/Game.css";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

function Games(props) {
    const [search, setGame] = useState("");
    const [page, setPage] = useState(1);
    const handlePaginationChange = (event, value) => {
        setPage(value);
    };

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
                        <Link to={`/review/${p._id}`}> Check the reviews </Link>
                        <br />
                    </li>
                /*</div>*/
            ));
    };


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
            <Pagination
                count={Math.floor(21 / 3)}
                page={page}
                onChange={handlePaginationChange}
            />
        </div>
    );
}

Games.propTypes = {
    game: PropTypes.array,
};

export default Games;