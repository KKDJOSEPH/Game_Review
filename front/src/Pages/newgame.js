import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import "../css/newgame.css";
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
        <div className="App" role="main">
          <NavigationComponent/>
          <div className="row">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add a New Game</h1>
                <label className="text">Game Name</label>
                <br />
                <input type="text" name="name" className="form-control" required {...register('value_name')} id="name" placeholder="e.g. Super Mario"/>
                <br />
                <label className="text">Image URL</label>
                <br />
                <input type="text" name="image" className="form-control" {...register('value_name')} placeholder="A valid url directed to the image"/>
                <br />
                <label className="text">Rating</label>
                <br />
                <input type="number" name="rating" className="form-control" required {...register('value_name')} max="5" placeholder="Enter a number from 1-Disappointing to 5-Awesome"/>
                <br />
                <label className="text">Type</label>
                <br />
                <input type="text" name="type" className="form-control" required {...register('value_name')} placeholder="e.g. RPG, FPS"/>
                <br />
                <input className="btn btn-primary" type="submit" />
              </form>
              <br />
            </div>
          </div>
  );
}

export default NewGame;