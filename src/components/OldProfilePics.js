import React from 'react';
import { useOutletContext } from 'react-router-dom';

const OldProfilePics = () => {
    const [proflephotos] = useOutletContext();
    // console.log(proflephotos)
    return (
        <div style={{ maxWidth: "800px", margin: "0px auto" }}>
            <div className='postimages' id="test-swipe-1">
                {
                    proflephotos.map((item) => {
                        return (
                            <img key={item} className='post materialboxed responsive-img' src={item} alt="profle pictures" />
                        )
                    })
                }
            </div>
        </div>

    );
};

export default OldProfilePics;