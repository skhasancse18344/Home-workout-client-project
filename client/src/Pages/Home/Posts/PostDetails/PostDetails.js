import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../../auth/AuthContext/AuthProvider";
import { toast } from "react-hot-toast";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const postDetails = useLoaderData();
  const { _id, userName, title, description, muscleGroupId, image, postDate } =
    postDetails;

  const handleSaveWorkout = (e) => {
    e.preventDefault();
    const { _id, title, description, image, muscleGroupId } = postDetails;
    const userEmail = user?.email;

     const url = "http://localhost:5000/saveWorkout";

    axios
      .post(url, {
        _id,
        title,
        description,
        image,
        muscleGroupId,
        userEmail,
      })
      .then((response) => {
        if (response?.data.acknowledged) {
          toast.success("Workout Saved  Successfully");
        } else {
          toast.error("Workout Already Saved");
        }
      }).catch((error) => {
        console.log(error);
      });
    
  };
  return (
    <div className="w-full flex justify-center " style={{ color: "white" }}>
      <div className="card w-full h-full">
        <figure>
          <img
            className=" object-fill "
            src={`http://localhost:5000/${image}`}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">{muscleGroupId}</h2>
          <p>{description}</p>
          <p>Posted By: {userName}</p>

          <p>Post Date: {postDate}</p>
          <button
            className=" p-4 badge bg-workout-primary text-workout-secondary font-bold"
            onClick={handleSaveWorkout}
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
