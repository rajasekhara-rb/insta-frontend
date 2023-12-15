import React from 'react';
import { useOutletContext } from 'react-router-dom';

const MyPosts = () => {

    const [posts] = useOutletContext();

    return (
        <div style={{ maxWidth: "800px", margin: "0px auto" }}>
            <div className='postimages' id="test-swipe-1">
                {
                    posts.map(item => {
                        return (
                            <img key={item._id} className='post materialboxed' src={item.photo} alt={item.title} />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MyPosts;