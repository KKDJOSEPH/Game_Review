import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import "../css/Evaluate.css";
import NavigationComponent from "../components/navbar";

function NewGame(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  async function postData(data) {
    await fetch("/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
  }

  const onSubmit = async (data) => {
    postData(data);
    console.log(data);
    history.push("/");
  };
  
  return (
    <main>
    <div className="App">
      <NavigationComponent/>
      <div className="row">
        <div className="col-12">
        {/* <button
            type="button"
            className="corner btn btn-outline-dark"
            onClick={() => history.push("/")}
          >
            Return to Home
          </button> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="newGame"><strong>Add a New Game</strong></h1>
            <label><strong>Game Name</strong></label>
            <br />
            <input type="text" name="name" className="form-control" required {...register('value_name')} id="name" placeholder="e.g. Super Mario"/>
            <br />
            <label><strong>Image URL</strong></label>
            <br />
            <input type="text" name="image" className="form-control" {...register('value_name')} placeholder="A valid url directed to the image"/>
            <br />
            <label><strong>Rating</strong></label>
            <br />
            <input type="number" name="rating" className="form-control" required {...register('value_name')} max="5" placeholder="Enter a number from 1-Disappointing to 5-Awesome"/>
            <br />
            <label><strong>Type</strong></label>
            <br />
            <input type="text" name="type" className="form-control" required {...register('value_name')} placeholder="e.g. RPG, FPS"/>
            <br />
            <br />
            <input className="btn btn-primary" type="submit" />
          </form>

          <br />
        </div>
      </div>
    </div>
    </main>
  );
}

export default NewGame;