import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {

    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    // console.log(state);
    console.log(data);

    useEffect(() => {
        axios.get("http://localhost:5234/post/allposts", {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                setData(res.data.posts)
            })
    }, [])

    const deletePost = (id) => {
        // console.log(id)
        axios.delete(`http://localhost:5234/post/${id}`, {
            //include authorization token 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => response.data)
            .then(result => {
                console.log(result);
                const newData = data.filter(item => item._id !== result._id);
                // console.log(newData);
                setData(newData);//update the stated with new data of the post ->deleted 
            })
    }

    const likePost = (id) => {
        // console.log(id)
        axios.put("http://localhost:5234/post/like",
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
        axios.put("http://localhost:5234/post/dislike",
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
        axios.put("http://localhost:5234/post/comment",
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


            <div className='home'>
                {
                    data.map(item => {
                        // console.log(item)
                        return (
                            <div className='card home-card' key={item._id}>
                                <h5 style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px", margin: "0", alignItems: "center" }}>
                                    <Link to={item.postedBy !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
                                        <h5>{item.postedBy.name}</h5>
                                    </Link>
                                    {/* <div style={{}}> */}
                                    {item.postedBy._id === state._id && (
                                        <i style={{ float: "right" }} className="material-icons" onClick={() => deletePost(item._id)}>
                                            delete
                                        </i>
                                    )}
                                    {/* </div> */}
                                </h5>


                                <div className='card-image'>
                                    <img className='post activator' src={item.photo} alt="image1" />
                                </div>
                                <div className='card-content'>
                                    {/* <i className="material-icons" style={{ color: "red", fontSize: "30px" }}>favorite</i> */}

                                    {/* check if the current user has like post or different user  */}
                                    {item.likes.includes(state._id)
                                        ?
                                        /* //display unlike button if liked      */
                                        <i className="material-icons" onClick={() => { unlikePost(item._id) }}
                                            style={{ color: "red", fontSize: "30px" }}>
                                            {/* thumb_down */}favorite
                                        </i>
                                        :
                                        /* //display like button if not liked  */
                                        <i className="material-icons" onClick={() => { likePost(item._id) }}
                                            style={{ color: "red", fontSize: "30px" }}>
                                            {/* thumb_up */}favorite_border
                                        </i>
                                    }

                                    {/* new added  */}
                                    <span class="activator grey-text text-darken-4">
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
                                            <span style={{ color: "blue", fontSize: "14px" }}>{comment.postedBy.name}:</span>{comment.text}
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
                                            <i class="material-icons right">send</i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default Home;