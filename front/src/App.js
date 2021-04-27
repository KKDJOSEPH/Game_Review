import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/home.js";
import SignUp from "./Pages/signup";
import SignIn from "./Pages/signin";
import Game_in from "./Pages/Game_in";
import Review from "./Pages/Review";
import Evaluate from "./Pages/Evaluate";
import NewHome from "./Pages/newHome";


function App() {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const getGame = async () => {
            try {
                const _game = await fetch("/games").then((res) => res.json());
                setGames(_game);
            } catch (err) {
                console.log("error ", err);
            }
        };
        getGame();
    }, []);
    let id = [];
    for(let i=0; i<games.length; i++){
        let temp = games[i];
        id[i] = temp._id;
    }
    console.log(id);
    console.log("Render Homepage...");
    return (
      <div className="App">
          <Router>

              <Switch>
                  <Route exact path="/" component={() => <NewHome game={games}/>} />
                  <Route path="/home" component={Home} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/Game_in" component={Game_in} />
                  {id.map((p, i) => <Route key={`${i}`} path={`/review/${p}`} component={() => <Review id={p} game={games} index={i}/>}  />)}
                  {id.map((p, i) => <Route key={`${i}`} path={`/evaluate/${p}`} component={() => <Evaluate id={p} game={games} index={i}/>}  />)}
              </Switch>
          </Router>
      </div>
    );
}

export default App;
