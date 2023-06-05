import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../auth/AuthContext/AuthProvider';
import MyAllPostCard from './MyAllPostCard';

const MyAllPost = () => {
    const {user} = useContext(AuthContext);
    const [myAllPost, SetMyAllPost] = useState([]);
    useEffect(() =>{
        fetch(`http://localhost:5000/getMyAllPost/${user?.email}`)
        .then((res) => res.json())
        .then((data) =>SetMyAllPost(data))
    },[user?.email])
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 me-6 mt-6 '>
            {
                myAllPost.map((post) =><MyAllPostCard key={post?._id} post={post}></MyAllPostCard>)

            }
            
        </div>
    );
};

export default MyAllPost;