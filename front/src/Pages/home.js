import React, { useState, useEffect } from "react";
import "../css/style.css"
import { Link } from "react-router-dom";
import ListGames from "../components/ListGames.js";
import pagination from "../components/Pagination.js";


function Home() {
    const [games, setGames] = useState([]);
    //const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    //const [reload, setReload] = useState(0);

    const fetchGames = async () => {
        console.log("Getting games...");
        try {
            await fetch("/games")
                .then((res) => res.json())
                .then((result) => {
                    setGames(result.games);
                    setTotal(result.total);
                });
            console.log("Loading games...", games);
        } catch (err) {
            console.log("Error on fetching ", err);
        }
    };
    useEffect(() => {
        fetchGames();
    });

    return (
        <div className="App">  
            <div className="bg">
                <div className="main">
                    <h1>Posts Preview</h1>
                    <ListGames games={games}></ListGames>
                    <pagination total={total} page={page} onChangePage={setPage}></pagination>
                    <div className="row" id="viewposts"></div>
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
            </div>
        </div>
    );
}

export default Home;