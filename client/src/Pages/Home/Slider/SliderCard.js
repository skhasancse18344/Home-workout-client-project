import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext/AuthProvider';
import { toast } from 'react-hot-toast';

const SliderCard = ({sliderCardPost}) => {
  const {user} = useContext(AuthContext)
  
    const {_id,title,description,image,muscleGroupId}=sliderCardPost;
    const handleSaveWorkout = (e) => {
      e.preventDefault();
      const {_id, title, description, image, muscleGroupId } = sliderCardPost;
      const userEmail = user?.email;
     
      fetch("http://localhost:5000/saveWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({_id, title,description,image,muscleGroupId,userEmail}),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success('Workout Saved Successfully');
          } else {
           toast.error('Workout Already Saved');
          }
        });
    };
    
    return (
        <div className="border-2 border-workout-primary me-4 " style={{color: "white"}}>
        <figure>
          <img
          className=' h-72 w-full '
            src={`http://localhost:5000/${image}`}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">{muscleGroupId}</h2>
          <p>{description.slice(0, 100)}</p>
          
          <div className="w-full mt-6">
          <Link to={`/postDetails/${_id}`}><button className=" p-4 me-4 badge bg-workout-primary text-workout-secondary font-bold">
            View Details
          </button></Link>
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

export default SliderCard;