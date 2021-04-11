import React, { useState, useEffect } from "react";
import "../css/style.css"
import Games from "../components/Games";

function Home(props) {
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
                    <Games  game={games}/>
                    <div className="menu">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;