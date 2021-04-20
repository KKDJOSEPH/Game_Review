import { useHistory } from "react-router";
import "../css/Evaluate.css";

import {
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardBody,
} from "reactstrap";

function Review(props) {
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

    return (
      <div className="row">
        <div className="col-12">
        <button
              type="button"
              className="corner btn btn-outline-dark"
              onClick={() => history.push("/")}
            >
            Return To Home
        </button>
          {renderGames()}
          <strong>Comments: </strong>
          <br />
          <br />
          {RevealComments()}
        </div>
      </div>
    );
}

export default Review;
