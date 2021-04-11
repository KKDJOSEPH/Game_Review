import React, { useState, useEffect } from "react";
import "../css/style.css"
import Games_Signin from "../components/Game_Signin";
import NavigationComponent from "../components/navbar";

function Game_in() {
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
            <div className="bg">
                <div className="main">
                    <Games_Signin  game={games}/>
                </div>
            </div>
        </div>
    );
}

export default Game_in;