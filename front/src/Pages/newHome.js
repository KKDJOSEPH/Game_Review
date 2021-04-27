import "../css/newHome.css"
import NavigationComponent from "./navbar";
import {Link} from "react-router-dom";
import React from "react";
import StarRatings from "react-star-ratings";
import { Icon } from '@iconify/react';
import playstationIcon from '@iconify-icons/cib/playstation';
import nintendoSwitch from '@iconify-icons/mdi/nintendo-switch';
import pcIcon from '@iconify-icons/ls/pc';
import mobileDevice from '@iconify-icons/akar-icons/mobile-device';

function Platform(platform) {
    if(platform === "Switch") return <Icon icon={nintendoSwitch} />;
    if(platform === "PC") return <Icon icon={pcIcon} />;
    if(platform === "PS4") return <Icon icon={playstationIcon} />;
    if(platform === "Mobile") return <Icon icon={mobileDevice} />;
}

function NewHome(props) {
    let pokeMon = [];
    let core = [];
    let games = props.game;
    for(let i=0; i<games.length; i++){
        if(pokeMon.length === 2) break;
        if(games[i].Type === "Pokemon"){
            pokeMon.push(games[i]);
        }
    }

    for(let i=0; i<games.length; i++){
        if(core.length === 3) break;
        if(games[i].Type === "Action"){
            core.push(games[i]);
        }
    }

    const pokemon = (poke) => {
        return poke.map((p) => (
                <li key={p._id} className="Game-li">
                    <Link to={`/review/${p._id}`}>
                        <img
                            className="Game-img card-img-top"
                            src={`../image/${p._id}.jpg`}
                            alt={`${p.Name} (#${p._id})`}
                            title={`${p.Name} (#${p._id})`}
                        />{" "}
                    </Link>
                    <div className= "Game_Name">
                        {p.Name}
                    </div>
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
                                starRatedColor={'red'}
                                starSpacing="0"
                            />
                        </span>
                    </div>
                </li>
            ));
    };

    return (
        <div className="App">
            <NavigationComponent/>
            <div className="main" role="main">
                <section className="head">
                    <h1 className="head_text"> Best Rating </h1>
                    <br/>
                    <Link to={`/review/002`}>
                        <img
                            className="img-top card-img-top"
                            src={`../image/ringfit.jpg`}
                            alt={"Ring Fit Adventure"}
                            title={"Ring Fit Adventure"}
                        />{" "}
                    </Link>

                    <span className="head_text">
                        Ring Fit Adventure
                    </span>
                    <span className= "main_btn" >
                        <Link to={`/review/002`}>
                            <button
                                className=" main_btn btn btn-primary"
                            >
                                Learn more {">"}
                            </button>
                        </Link>
                        <br/>
                    </span>
                    <br/>
                    <br/>
                    <br/>
                </section>
                <br/>
                <div className="pokemon_text"> New Pokemon Release </div>
                <section className="pokemon">
                    <ol className="Game-ol">{pokemon(pokeMon)}</ol>
                    <br/>
                    <br/>
                </section>
                <div className="pokemon_text"> New Gaming Systems </div>
                <section className="Switch">
                    <br/>
                    <Link to={{ pathname: "https://www.nintendo.com/switch/" }} target="_blank">
                        <img
                            className="img-top card-img-top"
                            src={`../image/newSystem.jpg`}
                            alt={"Nintendo Switch"}
                            title={"Nintendo Switch and Nintendo Switch Lite"}
                        />{" "}
                    </Link>
                    <span className="head_text">
                        Nintendo Switch and Nintendo Switch Lite
                    </span>
                    <span className= "main_btn" >
                        <Link to={{ pathname: "https://www.nintendo.com/switch/" }} target="_blank">
                            <button
                                className=" main_btn btn btn-primary"
                            >
                                Starting at $199.99 MSRP* {">"}
                            </button>
                        </Link>
                        <br/>
                    </span>
                </section>
                <div className="bottom">
                    <br/>
                    <br/>
                    <br/>
                </div>
                <br/>
                <div className="pokemon_text"> Game for core players </div>
                <section className="hard_core">
                    <ol className="Game-ol">{pokemon(core)}</ol>
                    <br/>
                    <br/>
                </section>
            </div>
        </div>
    );
}

export default NewHome;