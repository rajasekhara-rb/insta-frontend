import React, { useContext } from 'react';
import { PostContext } from '../App';


const MyPosts = () => {
    // const { contextPosts, setContextPosts } = useContext(PostContext);
    return (
        <div className='postimages' id="test-swipe-1">
            {
                // .map(item => {
                //     return (
                //         <img key={item._id} className='post materialboxed' src={item.photo} alt={item.title} />
                //     )
                // })
            }
        </div>
    );
};

export default MyPosts;