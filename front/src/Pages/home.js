import React, { useState, useEffect } from "react";
import "../css/style.css"
import NavigationComponent from "../components/navbar";
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
                <div><NavigationComponent /></div>
                <div className="main">
                    <Games  game={games}/>
                    <div className="menu">
{/*                        <div className="corner">
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
                            <Link to="/newgame">
                                <button className="btn btn-primary button" role="button">
                                    Add a New Game
                                </button>
                            </Link>
                        </div>*/}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;