import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext/AuthProvider";
import MyWorkoutCard from "./MyWorkoutCard";



const MySavedWorkout = () => {
  const { user } = useContext(AuthContext);

  const [myWorkout, setMyWorkout] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/getMyWorkout/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyWorkout(data));
  }, [user?.email]);
  console.log(myWorkout);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-6 me-4">
      {myWorkout.map((workout) => (
        <MyWorkoutCard workout={workout}></MyWorkoutCard>
      
      ))}
    </div>
  );
};

export default MySavedWorkout;
