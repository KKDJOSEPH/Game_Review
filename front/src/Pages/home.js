import React, { useState, useEffect } from "react";
import "../css/style.css"
import { Link } from "react-router-dom";
import ListGames from "../components/ListGames.js";
import Pagination from "../components/Pagination.js";


function Home() {
    const [games, setGames] = useState([]);
    //const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    //const [reload, setReload] = useState(0);

    const fetchGames = async () => {
        console.log("Getting games...");
        try {
            const resRaw = await fetch("./games");
            const res = await resRaw.json();
            console.log("Loading games...", res);
            setGames(res.games);
            setTotal(res.total);
        } catch (err) {
            console.log("Error on fetching ", err);
        }
    };
    useEffect(() => {
        fetchGames();
        return () => {
            //do any cleanup;
        };
    });

    console.log("Render Homepage...");
    return (
        <div className="App">
            <h1>Posts Preview</h1>
            <div className="bg">
                <div className="main">
                    <ListGames games={games}></ListGames>
                    <Pagination total={total} page={page} onChangePage={setPage}></Pagination>
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