import React, { useState, useEffect } from "react";
import "../css/style.css"

function Review(props) {
    console.log("Render Homepage...");
    return (
        <div className="App">
            <h1>{props.id}</h1>
            <h1>{props.index}</h1>
{/*            <h1>{props.game}</h1>*/}
        </div>
    );
}

export default Review;