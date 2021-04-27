import { useHistory } from "react-router";
import { useState , useEffect } from "react";
import "../css/Evaluate.css";
import PaginationComponent from "../components/Pagination";
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
    let [comments, setComments] = useState([])
    let [page, setPage] = useState(0);
    let [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const resRaw = await fetch(`/getComments?id=${id}&page=${page}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ page: page }),
            });
            const res = await resRaw.json();
            setComments(res.comments);
            setTotal(res.total);
          } catch (error) {
            console.error(error);
          }
        };
        fetchComments();
    }, [id, page]);

    
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
            <div>
                {comments.map((comment, index) =>(
                    <div key={index}>
                        {comment}
                        <hr />
                    </div>
                ))}
            </div>
        )
    }

    return (
      <main>  
      <div className="row">
        <div className="col-12">
        <button
              type="button"
              className="corner btn btn-outline-dark"
              onClick={() => history.push("/")}
            >
            Return To Home
        </button>
        <h1>Take a look at how others are talking about this game...</h1>
          {renderGames()}
          <strong>Comments:</strong>
          {RevealComments()}
          <br />
          <br />
          <div className="Pagination">
                <PaginationComponent
                    total={total}
                    page={page}
                    onChangePage={setPage}
                ></PaginationComponent>
          </div>
        </div>
      </div>
      </main>
    );
}

export default Review;
