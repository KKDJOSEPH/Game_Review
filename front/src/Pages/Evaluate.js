import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import "../css/Evaluate.css";
import logo from "./game_icon4.png"

import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import NavigationComponent from "../components/NavBar";
import {Link, useLocation} from "react-router-dom";

function Evaluate(props) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  let id = props.id;
  let game = props.game;
  let index = props.index;
  let currentGame = game[index];

  const renderGames = () => {
      return(
          <div className="card-deck">
              <Card style={{ width: "30rem", margin: "2rem" }} key={id}>
                  <CardImg
                      top
                      width="100%"
                      height="40%"
                      src={`../image/${id}.jpg`}
                      className="card-img-top"
                      alt="game image"
                  />
                  <CardBody>
                      <CardTitle>
                          <strong>
                              <p>{currentGame.Name}</p >
                          </strong>
                      </CardTitle>
                      <CardSubtitle>
                          <span className="type">Type: {currentGame.Type}</span>
                          <br />
                          <span className="rating">Rating: {currentGame.Rating}</span>
                      </CardSubtitle>
                  </CardBody>
              </Card>
          </div>
      )

  };

  function RevealComments() {
    console.log("Comments:");
    return (
        <ul>
            {currentGame.commentList.map((comment, index) =>(
                <div key={index}>
                    {comment}
                    <hr />
                </div>
            ))}
        </ul>
    )
  }

  async function postComment(data) {
    await fetch("/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  const onSubmit = async (data) => {
    data["_id"] = currentGame.id;
    postComment(data);
  };
    const location = useLocation();
    console.log("Render NavigationComponent", location);
  return (
    <div className="App">
        <NavigationComponent/>
      <div className="col-12">
          {renderGames()}
          <strong>Comments: </strong>
          <br />
          <br />
          {RevealComments()}
          <form onSubmit={handleSubmit(onSubmit)}>
              <label>New Comment:</label>
              <br />
              <input type="text" className="form-control" name="comment" required {...register('value_name')} />
              <br />
              <br />
              <input className="btn btn-success" type="submit" />
          </form>
      </div>
    </div>
  );
}      

export default Evaluate;