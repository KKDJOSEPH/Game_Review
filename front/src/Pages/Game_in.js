import React, { useState, useEffect } from "react";
import "../css/style.css"
import { Link } from "react-router-dom";
import Games_Signin from "../components/Game_Signin";
import NavigationComponent from "../components/navbar";

function Game_in(props) {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const getGame = async () => {
            try {
                const _game = await fetch("/game").then((res) => res.json());
                setGames(_game);
            } catch (err) {
                console.log("error ", err);
            }
        };
        getGame();
    }, []);
    console.log("Render Homepage...");
    return (
        <div className="App">
            <div><NavigationComponent /></div>
            <div className="bg">
                <div className="main">
                    <Games_Signin  game={games}/>
                </div>
            </div>
        </div>
    );
}

export default Game_in;