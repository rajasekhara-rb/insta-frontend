import React from 'react';
import { useOutletContext } from 'react-router-dom';

const MyPosts = () => {

    const {posts} = useOutletContext();

    return (
        <div style={{ maxWidth: "800px", margin: "0px auto", height:"100%" }}>
            <div className='postimages' id="test-swipe-1">
                {
                    posts.map(item => {
                        return (
                            <div style={{width:"400px", height:"auto"}}>
                                <img key={item._id} className='materialboxed responsive-img' src={item.photo} alt={item.title} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default MyPosts;