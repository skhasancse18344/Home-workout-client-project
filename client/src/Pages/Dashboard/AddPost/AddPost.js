import React, { useContext, useEffect, useReducer, useState } from "react";

import { AuthContext } from "../../../auth/AuthContext/AuthProvider";
import { addPostReducer , initialState} from "../../../state/addPostState/addPostReducer";
import { actionTypes } from "../../../state/actionType";
import { toast } from "react-hot-toast";

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [state,dispatch] = useReducer(addPostReducer,initialState);
  const handleImageChange = (event) => {
  dispatch({type:actionTypes.IMAGE,payload:event.target.files[0]})
  };
 
  
  useEffect(() => {

    fetch('http://localhost:5000/getAllCategory')
    .then(res => res.json())
    .then((data) => dispatch({type:actionTypes.INPUT,payload:data}));
    
  },[])


  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!state?.image) {
      window.alert("Please upload an image");
      return ;
     
  };
   const userName = e.target.userName.value;
   const title = e.target.title.value;
   const description = e.target.description.value;
   const muscleGroupId = e.target.muscleGroupId.value;
   
   
   const formData = new FormData();
   formData.append("image", state?.image);
   formData.append("userName", userName);
   formData.append("userEmail", user?.email);
   formData.append("title", title);
   formData.append("description", description);
   formData.append("muscleGroupId", muscleGroupId);
  
   fetch("http://localhost:5000/addPost",{
    method: "POST",
   
    body: formData
    }).then(res=>res.json())
    .then(data=>{
     toast.success('Add post successfully');
      e.target.reset();
    })
    
  }

  return (
    <div className="m-16 w-full">
      <h1 className="text-4xl font-bold text-center my-10 mt-10 md:mt-10 lg:mt-10  " style={{color: "white"}}>
        Add Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{color: "white"}}>User Name</span>
          </label>

          <input
          style={{color: "black"}}
            type="text"
            name="userName"
            placeholder="Enter Your Name"
            defaultValue={user?.name}
            readOnly
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{color: "white"}}>Post Title</span>
          </label>

          <input
          style={{color: "black"}}
            type="text"
            name="title"
            placeholder="Post Title"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{color: "white"}}>Post Description</span>
          </label>
          <textarea
          style={{color: "black"}}
            name="description"
            cols="30"
            rows="10"
            placeholder="Post Description"
            className="input input-bordered w-full "
          ></textarea>
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text" style={{color: "white"}}>Post Image</span>
          </label>

          <input
          style={{color: "black"}}
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
            placeholder="Enter Image"
            className="input input-bordered w-full py-2 "
          />
        </div>
        <span className="font-bold text-lg" style={{color: "white"}}>Post Category : </span>{" "}
        <select
          name="muscleGroupId"
          className="my-10 border p-2 w-1/2 border-lime-800 rounded-lg" style={{color: "black"}}
        >
          {
            state?.category.map((item) =><option value={item?.categoryName}>{item?.categoryName}</option> )
          }
          
        </select>
        <br />
        <input className="btn btn-accent w-full mt-6" type="submit" />
      </form>
    </div>
  );
};

export default AddPost;
