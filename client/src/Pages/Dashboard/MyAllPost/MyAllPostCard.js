import React from "react";
import { Link } from "react-router-dom";

const MyAllPostCard = ({post}) => {
    const {_id, title, description, image, muscleGroupId } = post;
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
            <Link to={`/postDetails/${_id}`}><button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold">
              View Details
            </button></Link>
            
            
          </div>
        </div>
      </div>
      
    );
};

export default MyAllPostCard;