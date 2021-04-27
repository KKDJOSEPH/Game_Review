import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useState , useEffect } from "react";
import "../css/Evaluate.css";
import PaginationComponent from "../components/Pagination";
import NavigationComponent from "../components/navbar";
import StarRatings from "react-star-ratings";
import { Icon } from '@iconify/react';
import playstationIcon from '@iconify-icons/cib/playstation';
import nintendoSwitch from '@iconify-icons/mdi/nintendo-switch';
import pcIcon from '@iconify-icons/ls/pc';
import mobileDevice from '@iconify-icons/akar-icons/mobile-device';

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

  function Platform(platform) {
    if(platform === "Switch") return <Icon icon={nintendoSwitch} />;
    if(platform === "PC") return <Icon icon={pcIcon} />;
    if(platform === "PS4") return <Icon icon={playstationIcon} />;
    if(platform === "Mobile") return <Icon icon={mobileDevice} />;
  }

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
        <div className="bg">
          <div className="card-deck">
              <Card style={{ width: "26rem", margin: "auto" }} key={id}>
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
                          <span className="type"><strong>Type: {currentGame.Type}</strong></span>
                            <br />
                            <span className="rating"><strong>Rating: {currentGame.Rating}</strong></span>
                            <br />
                            <span><strong>Platform: {Platform(currentGame.Platform1)} {Platform(currentGame.Platform2)}</strong></span>
                          <span className="Game_Info2">
                            <StarRatings
                                numberOfStars={5}
                                rating= {parseInt(currentGame.Rating)}
                                starDimension="18px"
                                starEmptyColor='grey'
                                starRatedColor={'red'}
                                starSpacing="0"
                            />
                          </span>
                      </CardSubtitle>
                  </CardBody>
              </Card>
          </div>
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
    <div className="App">
      <NavigationComponent/>
      {/* <div className="row"> */}
      <div className="col-12">
        {/* <button
            type="button"
            className="corner btn btn-outline-dark"
            onClick={() => history.push("/Game_in")}
          >
            Return To Home
        </button> */}
        {/* <h1>Want to say something about this game?</h1> */}
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
      {/* </div> */}
    </div>
    </main>
  );
}      

export default Evaluate;