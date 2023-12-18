import React, { useContext } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import M from 'materialize-css';
import { BaseUrlContext } from '../App';
import axios from 'axios';
const OldProfilePics = () => {
    M.AutoInit()
    const { proflephotos, setProfilePhotos } = useOutletContext();
    // console.log(proflephotos)
    const baseUrl = useContext(BaseUrlContext);
    // console.log(baseUrl);
    // console.log(proflephotos);
    const navigate = useNavigate();

    const deleteImage = (url) => {
        // console.log(id)
        axios.put(`${baseUrl}/user/deleteoldprofilepic`,
            { url: url },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then((res) => {
            setProfilePhotos(res);
            navigate("/profile")
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0px auto" }}>
            <div className='postimages' id="test-swipe-1">
                {
                    proflephotos? (
                        proflephotos?.map((item) => {
                            return (
                                <>
                                    <div className='post' style={{ width: "250px", height: "auto" }}>
                                        <i className='material-icons'
                                            onClick={() => { deleteImage(item) }}
                                            style={{ position: "relative", top: "30px", cursor: 'pointer', zIndex: "2", color: "auto" }}
                                        >delete</i>
                                        <img key={item}
                                            className=' materialboxed responsive-img'
                                            src={item} alt="profle pictures"
                                            style={{ width: "250px", height: "250px" }} />
                                    </div>
                                </>
                            )
                        })
                    ) : ("No photos")
                }
            </div>
        </div>

    );
};

export default OldProfilePics;