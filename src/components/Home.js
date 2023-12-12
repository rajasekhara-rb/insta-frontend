import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext, UserContext } from '../App';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
    const { state, dispatch } = useContext(UserContext);
    const baseUrl = useContext(BaseUrlContext);
    const [data, setData] = useState([]);
    // console.log(state);
    // console.log(data);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({ type: "USER", payload: user });
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}/post/allposts`, {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                // console.log(res.data)
                setData(res.data.posts);
            })
    }, [])

    const deletePost = (id) => {
        // console.log(id)
        axios.delete(`${baseUrl}/post/${id}`, {
            //include authorization token 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.data)
            .then(result => {
                // console.log(result);
                const newData = data.filter(item => item._id !== result._id);
                // console.log(newData);
                setData(newData);//update the stated with new data of the post ->deleted 
            })
    }

    const likePost = (id) => {
        // console.log(id)
        axios.put(`${baseUrl}/post/like`,
            { postId: id },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(res => res.data)
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item
                    }
                });
                setData(newData);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const unlikePost = (id) => {
        // console.log(id)
        axios.put(`${baseUrl}/post/dislike`,
            {
                postId: id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(response => response.data)
            .then(result => {
                // console.log(result);
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(error => {
                console.log(error);
            })
    }

    const handleComment = (text, postId) => {
        if (!text) {
            toast.error("Comment can't be empty");
            return
        }
        axios.put(`${baseUrl}/post/comment`,
            { postId, text },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(response => response.data)
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            {data ? (
                <div className='home'>
                    {
                        data.map(item => {
                            // console.log(item)
                            return (
                                <div className='card home-card' key={item._id}>
                                    <h5 style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px", margin: "0", alignItems: "center" }}>
                                        <Link to={item.postedBy !== state._id ? "/profile/" + item.postedBy._id : "/profile"}
                                            style={{ display: 'flex', justifyContent: 'left', alignItems: "center", width: "80%" }}
                                        >
                                            <img style={{ width: "40px", height: "40px" }}
                                                class="circle  responsive-img"
                                                src={item.postedBy.photo ? item.postedBy.photo : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"}
                                                alt='profile' />
                                            <h5 style={{ marginLeft: "10px" }}>{item.postedBy.name} {item.postedBy._id === state._id ? "(You)" : ""}</h5>
                                        </Link>
                                        {/* <div style={{ padding: "10px" }} className="material-icons dropdown-trigger" data-target='dropdown1'>
                                            <i style={{ float: "right" }} className="material-icons">
                                                more_horiz
                                            </i>
                                        </div> */}
                                        {/* <ul className='dropdown-content' id='dropdown1'>
                                            <li>
                                                <Link to={item.postedBy !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
                                                    <i style={{ float: "left" }} className="material-icons">
                                                        person
                                                    </i> Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <i style={{ float: "left" }} className="material-icons">
                                                    share
                                                </i> Share
                                            </li>
                                            <li className="divider"></li>
                                            <li>
                                                {item.postedBy._id === state._id && (
                                                    <li>
                                                        <i style={{ float: "right" }} className="material-icons" onClick={() => deletePost(item._id)}>
                                                            delete
                                                        </i> Delete
                                                    </li>
                                                )}
                                            </li>
                                        </ul> */}
                                        {/* {item.postedBy._id !== state._id && (
                                            <i style={{ float: "right" }} className="material-icons">
                                                more_horiz
                                            </i>
                                        )} */}
                                        {item.postedBy._id === state._id && (
                                            <i style={{ float: "right", cursor: 'pointer' }} className="material-icons" onClick={() => deletePost(item._id)}>
                                                delete
                                            </i>
                                        )}
                                    </h5>

                                    <div className='card-image'>
                                        <img className='post activator' src={item.photo} alt="image1" style={{ borderRadius: "2%" }} />
                                    </div>
                                    <div className='card-content'>
                                        {/* <i className="material-icons" style={{ color: "red", fontSize: "30px" }}>favorite</i> */}

                                        {/* check if the current user has like post or different user  */}
                                        {item.likes.includes(state._id)
                                            ?
                                            /* //display unlike button if liked      */
                                            <i className="material-icons" onClick={() => { unlikePost(item._id) }}
                                                style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                                                {/* thumb_down */}favorite
                                            </i>
                                            :
                                            /* //display like button if not liked  */
                                            <i className="material-icons" onClick={() => { likePost(item._id) }}
                                                style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                                                {/* thumb_up */}favorite_border
                                            </i>
                                        }

                                        {/* new added  */}
                                        <span class="activator grey-text text-darken-4" style={{ cursor: "pointer" }}>
                                            <i class="material-icons right">chat</i>
                                        </span>
                                        <p>{item.likes.length} likes</p>
                                        <span class="card-title  grey-text text-darken-4">{item.title}
                                            {/* <i class="material-icons right">chat</i> */}
                                        </span>
                                        <p>{item.body}</p>

                                        {/* <h6>{item.title}</h6> */}
                                        {/* <p>{item.body}</p> */}
                                    </div>
                                    <div class="card-reveal">
                                        <span class="card-title grey-text text-darken-4">Comments
                                            <i class="material-icons right">close</i>
                                        </span>
                                        {/* <p>Here is some more information about this product that is only revealed once clicked on.</p> */}
                                        {item.comments.map(comment => (
                                            <h6 style={{ fontWeight: "bolder", fontSize: "14px" }} key={comment._id}>
                                                <span style={{ color: "blue", fontSize: "14px" }}>
                                                    {comment.postedBy._id === item.postedBy._id ?
                                                        comment.postedBy.name + " (Author)" :
                                                        comment.postedBy._id === state._id ?
                                                            comment.postedBy.name + " (You)" :
                                                            comment.postedBy.name}:
                                                </span>{comment.text}
                                            </h6>

                                        ))}

                                        {/* logic for comments  */}
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            // console.log(e.target[0].value)
                                            handleComment(e.target[0].value, item._id);
                                            e.target[0].value = '';
                                        }} style={{ display: 'flex' }}>
                                            <input type="text" placeholder='Add a comments' />
                                            <button type="submit" style={{ background: "none", border: "none" }}>
                                                <i class="material-icons right" style={{ cursor: "pointer" }}>send</i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div >
            ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div class="preloader-wrapper big active" >
                        <div class="spinner-layer spinner-blue" >
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div >
            )}

            {/* <div class="card" style={{width:"50%"}}>
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_640.jpg" />
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">This is a link</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div> */}
        </>
    );
};

export default Home;