import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import "../css/Evaluate.css";

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
    <div>
      <div className="row">
        <div className="col-12">
        <button
            type="button"
            className="corner btn btn-outline-dark"
            onClick={() => history.push("/")}
          >
            Return to Home
          </button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Add a New Game</h1>
            <label>Game Name</label>
            <br />
            <input type="text" name="name" className="form-control" required {...register('value_name')} />
            <br />
            <label>Image URL</label>
            <br />
            <input type="text" name="image" className="form-control" {...register('value_name')} />
            <br />
            <label>Rating</label>
            <br />
            <input type="number" name="rating" className="form-control" required {...register('value_name')} />
            <br />
            <label>Type</label>
            <br />
            <input type="text" name="type" className="form-control" required {...register('value_name')} />
            <br />
            <br />
            <input className="btn btn-primary" type="submit" />
          </form>

          <br />
        </div>
      </div>
    </div>
  );
}

export default NewGame;