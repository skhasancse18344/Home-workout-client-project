import React, { useContext, useEffect, useReducer, useState } from "react";

import { AuthContext } from "../../../auth/AuthContext/AuthProvider";
import {
  EditProfileReducer,
  initialState,
} from "../../../state/EditProfileState/EditProfileReducer";
import { actionTypes } from "../../../state/actionType";
import { toast } from "react-hot-toast";

const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(EditProfileReducer, initialState);

  const handleImageChange = (event) => {
    dispatch({ type: actionTypes.IMAGE, payload: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state?.image) {
      console.log("File not found");
      return;
    }
    const userName = e.target.userName.value;
    const weight = e.target.weight.value;
    const height = e.target.height.value;
    const id = user?.id;

    const formData = new FormData();
    formData.append("image", state?.image);
    formData.append("userName", userName);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("id", id);

    fetch("http://localhost:5000/userUpdate", {
      method: "PUT",

      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success('User updated successfully');
        e.target.reset();
      });
  };
  return (
    <div className="m-16 w-full">
      <h1 className="text-4xl font-bold text-center my-10 mt-10 md:mt-10 lg:mt-10 ">
        Edit Profile
      </h1>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              User Name
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="userName"
            placeholder="Enter Your Name"
            defaultValue={user?.name}
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              Wight
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="weight"
            placeholder="Wight"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              height
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="text"
            name="height"
            placeholder="height"
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{ color: "white" }}>
              User Image
            </span>
          </label>

          <input
            style={{ color: "black" }}
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            placeholder="Enter Image"
            className="input input-bordered w-full py-2 "
          />
        </div>

        <br />
        <input className="btn btn-accent w-full mt-6" type="submit" />
      </form>
    </div>
  );
};

export default EditProfile;
