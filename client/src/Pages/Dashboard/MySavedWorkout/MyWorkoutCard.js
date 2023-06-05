import React from "react";
import { Link } from "react-router-dom";

const MyWorkoutCard = ({workout}) => {
    const {postId,title, description, image, muscleGroupId } = workout;
  return (
    <div className="border-2 border-workout-primary ">
      <figure>
        <img
          className=" h-72 w-full"
          src={`http://localhost:5000/${image}`}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2 className="card-title ">{muscleGroupId}</h2>
        <p>{description.slice(0, 200)}</p>
        {/* <p>{Time}</p>
                  <p>{Date}</p> */}
                  <div className="w-full mt-6">
          <Link to={`/postDetails/${postId}`}>
            <button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold">
              View Details
            </button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default MyWorkoutCard;

// import React from 'react';

// const MySavedWorkoutCard = ({workout}) => {
//     const {title, description, image, muscleGroupId } = workout;
//     return (
//         <div className="border-2 border-workout-primary ">
//         <figure>
//           <img
//             className=" h-72 w-full"
//             src={`http://localhost:5000/${image}`}
//             alt="Shoes"
//           />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title">{title}</h2>
//           <h2 className="card-title ">{muscleGroupId}</h2>
//           <p>{description.slice(0, 200)}</p>
//           {/* <p>{Time}</p>
//           <p>{Date}</p> */}

//           </div>
//         </div>

//     );
// };

// export default MySavedWorkoutCard;
