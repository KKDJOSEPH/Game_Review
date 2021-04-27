import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
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

function Evaluate(props) {
  const { register, handleSubmit } = useForm();
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

  return (
    <main>
    <div className="row">
      <div className="col-12">
        <button
            type="button"
            className="corner btn btn-outline-dark"
            onClick={() => history.push("/Game_in")}
          >
            Return To Home
        </button>
        <h1>Want to say something about this game?</h1>
        {renderGames()}
        <strong>Existing Comments: </strong>
        <br />
        <br />
        {RevealComments()}
        <div className="Pagination">
                <PaginationComponent
                    total={total}
                    page={page}
                    onChangePage={setPage}
                ></PaginationComponent>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label><strong>New Comment:</strong></label>
          <br />
          <input type="text" className="form-control" Name="comment" required {...register('value_name')} placeholder="What do you think of this game?" />
          <br />
          <br />
          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    </div>
    </main>
  );
}      

export default Evaluate;