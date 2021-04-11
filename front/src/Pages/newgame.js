
import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function NewGame(props) {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  async function postData(data) {
    // Default options are marked with *
    await fetch("/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(data),
    });
  }

  const onSubmit = async (data) => {
    postData(data);
    console.log(data);
    history.push("./home");
  };
  
  return (
    <div>
      <div className="row">
        <p>Hello</p>
        <div className="col-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create a New Game</h1>
            <label>Game Name</label>
            <br />
            <input type="text" name="name" ref={register} />
            <br />
            <label>Image ID</label>
            <br />
            <input type="number" name="image" ref={register} />
            <br />
            <label>Rating</label>
            <br />
            <input type="number" name="rating" ref={register} />
            <br />
            <label>Type</label>
            <br />
            <input type="text" name="type" ref={register} />
            <br />
            <br />
            <input className="btn btn-success" type="submit" />
          </form>
          <br />
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => history.push("/home")}
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGame;

//   function seeComments() {
//     console.log("commentsection");
//     return parties
//       .filter((p) => p._id && p._id === props.id)
//       .map((p) => (
//         <div
//           className="media-body p-2 shadow-sm rounded bg-light border"
//           key={p._id}
//         >
//           {p.commentList.map((commentNum) => (
//             <div>
//               <h6 className="mt-0 mb-1 text-muted">
//                 {commentNum.firstName}, {commentNum.lastName}
//               </h6>
//               {commentNum.comment}
//             </div>
//           ))}
//         </div>
//       ));
//   }

//   async function postComment(data) {
//     // Default options are marked with *
//     await fetch("/party/comment", {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.

//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },

//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//   }

//   const onSubmit = async (data) => {
//     data["_id"] = props.id;
//     postComment(data);
//   };

// //   return (
// //     <div className="row">
// //       <div className="col-8">
// //         {renderUserParties()}
// //         {seeComments()}
// //       </div>
// //       <div className="col-4">
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <h1>Leave a comment</h1>

// //           <label>First Name</label>
// //           <br />
// //           <input type="text" name="authorFirstName" ref={register} />
// //           <br />
// //           <label>Last Name</label>
// //           <br />
// //           <input type="text" name="authorLastName" ref={register} />
// //           <br />
// //           <label>Comment</label>
// //           <br />
// //           <input type="text" name="comment" ref={register} />

// //           <br />
// //           <br />
// //           <input className="btn btn-success" type="submit" />
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// export default SingleParty;