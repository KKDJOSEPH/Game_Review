import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import "../css/Evaluate.css";

import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
} from "reactstrap";

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
              <Card style={{ width: "30rem", margin: "5rem" }} key={id}>
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
                      </CardSubtitle>
                  </CardBody>
              </Card>
          </div>
      )

  };

  function RevealComments() {
      console.log("Comments:");
      return (
        <div
          //className="media-body p-2 shadow-sm rounded bg-light border"
          key={currentGame._id}
        >
          <div>
            {currentGame.comment}
          </div>
          <hr />
        </div>
    )
  }

  async function postComment(data) {
    // Default options are marked with *
    await fetch("/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  }

  const onSubmit = async (data) => {
    data["_id"] = currentGame.id;
    postComment(currentGame.id);
  };

  return (
    <div className="row">
      <div className="col-8">
        {renderGames()}
        {RevealComments()}
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Leave a Comment</h1>
          <label>Comment:</label>
          <br />
          <input type="text" name="comment" {...register('value_name')} />
          <br />
          <br />
          <input className="btn btn-success" type="submit" />
        </form>
        <br />
        <button
            type="button"
            className="corner btn btn-outline-dark"
            onClick={() => history.push("/")}
          >
            Return To Home
        </button>
      </div>
    </div>
  );
}      

export default Evaluate;


// function Evaluate(props) {
//     console.log("Render Homepage...");
//     return (
//         <div className="App">
//             <h1>{props.id}</h1>
//             <h1>{props.index}</h1>
// {/*            <h1>{props.game}</h1>*/}
//         </div>
//     );
// }

// export default Evaluate;