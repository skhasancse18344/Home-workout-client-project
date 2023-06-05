import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddCategory = () => {

    const [Category,SetCategory]=useState("");

    const handleCategoryAdd = (e) => {
        e.preventDefault();
        const categoryName = Category;
        
        fetch('http://localhost:5000/addCategory',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({categoryName})        
        })
        .then(res => res.json())
        .then((data)=>{
          if(data.acknowledged){
            toast.success('Added Category Successfully')
          }
          else{
            toast.error('Category Already Added')
          }
          
        })
        
        
    }
    return (
        <div >
        <input style={{color: "black"}} type='text' name='category' placeholder='Please add a Category ' className='input input-bordered input-secondary w-full max-w-xs' onChange={(e)=>SetCategory(e.target.value)}></input>
        <button className='btn btn-outline bg-workout-primary text-workout-secondary mx-auto mt-6 ' onClick={handleCategoryAdd} > Add Category</button>
        </div>
    );
};

export default AddCategory;