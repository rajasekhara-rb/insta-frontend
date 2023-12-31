import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext, UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import PostDropDown from './PostDropDown';
import M from 'materialize-css';


const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        M.AutoInit();
    })
    // const userId = localStorage.getItem("user")._id;
    const { state, dispatch } = useContext(UserContext);
    // console.log(state)
    const baseUrl = useContext(BaseUrlContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // console.log(state);
    // console.log(data)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "USER", payload: user });
        } else {
            navigate("/signin");
        }
    }, [dispatch, navigate])


    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseUrl}/post/allposts`, {
            headers: {
                "Content-type": "Application/json",
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then((res) => {
                // console.log(res.data)
                setData(res.data.posts);
                setIsLoading(false);
            })
    }, [baseUrl])

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
            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:"50px" }}>
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {
                        data.length > 0 ? (
                            <div className='home'>
                                {
                                    data.map(item => {
                                        // console.log(item)
                                        return (
                                            <>
                                                <div className='card home-card' key={item._id}>
                                                    <h5 style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px", margin: "0", alignItems: "center" }}>
                                                        <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}
                                                            style={{ display: 'flex', justifyContent: 'left', alignItems: "center", width: "80%" }}
                                                        >
                                                            <img style={{ width: "40px", height: "40px", border: "2px solid #ff8a80" }}
                                                                class="circle  responsive-img"
                                                                src={item.postedBy.photo ? item.postedBy.photo : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"}
                                                                alt='profile' />
                                                            <h5 style={{ marginLeft: "10px" }}>{item.postedBy.name} {item.postedBy._id === state._id ? "(You)" : ""}</h5>
                                                        </Link>

                                                        {/* {item.postedBy._id !== state._id && (
                                            <i style={{ float: "right" }} className="material-icons">
                                                more_horiz
                                            </i>
                                        )} */}
                                                        {item.postedBy._id === state._id && (
                                                            <i style={{ float: "right", cursor: 'pointer' }} className="material-icons tooltipped" data-tooltip="Delete Post" data-position="top"
                                                                onClick={() => deletePost(item._id)}>
                                                                delete
                                                            </i>
                                                        )}

                                                        {item.postedBy._id === state._id && (
                                                            <i style={{ float: "right", cursor: 'pointer' }} className="material-icons tooltipped" data-tooltip="Edit Post" data-position="top"
                                                                onClick={() => { navigate(`/editpost/${item._id}`) }}>
                                                                edit
                                                            </i>
                                                        )}
                                                        {/* <PostDropDown item={item} deletePost={deletePost} state={state} /> */}
                                                    </h5>

                                                    <div className='card-image'>
                                                        {/* <div style={{ backgroundImage: `url(${item.photo})`, width: "500px", height:"500px", backgroundRepeat:"no-repeat", objectFit:"contain" }}></div> */}
                                                        <img data-target={`${item._id}`} className='post modal-trigger' src={item.photo} alt="image1" style={{ borderRadius: "2%", cursor: "pointer" }} />
                                                    </div>
                                                    <div className='card-content'>
                                                        {/* <i className="material-icons" style={{ color: "red", fontSize: "30px" }}>favorite</i> */}

                                                        {/* check if the current user has like post or different user  */}
                                                        {item.likes.includes(state._id)
                                                            ?
                                                            /* //display unlike button if liked      */
                                                            <i className="material-icons tooltipped" data-tooltip="Dislike Post" data-position="top"
                                                                onClick={() => { unlikePost(item._id) }}
                                                                style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                                                                {/* thumb_down */}favorite
                                                            </i>
                                                            :
                                                            /* //display like button if not liked  */
                                                            <i className="material-icons tooltipped" data-tooltip="Like Post" data-position="top"
                                                                onClick={() => { likePost(item._id) }}
                                                                style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                                                                {/* thumb_up */}favorite_border
                                                            </i>
                                                        }

                                                        {/* new added  */}
                                                        <span class="activator grey-text text-darken-4" style={{ cursor: "pointer" }}>
                                                            <i class="material-icons right tooltipped" data-tooltip="Comment Post" data-position="top">chat</i>
                                                        </span>
                                                        <p>
                                                            <span className='left'>{item.likes.length} likes</span>
                                                            <span className='right'>{item.comments.length} comments</span>
                                                        </p>
                                                        <br /><br />
                                                        <span class="card-title  grey-text text-darken-4">
                                                            {item.title}
                                                            {/* <i class="material-icons right">chat</i> */}
                                                        </span>
                                                        <p>{item.body}</p>
                                                        {/* <h6>{item.title}</h6> */}
                                                        {/* <p>{item.body}</p> */}
                                                    </div>
                                                    <div class="card-reveal">
                                                        <span class="card-title grey-text text-darken-4">Comments
                                                            <i class="material-icons right tooltipped" data-tooltip="Close" data-position="top">close</i>
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
                                                                <i class="material-icons right tooltipped" data-tooltip="Post Comment" data-position="top" style={{ cursor: "pointer" }}>send</i>
                                                            </button>
                                                        </form>
                                                    </div>

                                                    {/* modal open opening single post  */}
                                                    {/* <button data-target="modal1" class="btn modal-trigger">Modal</button> */}

                                                </div>
                                                <div id={`${item._id}`} class="modal modal-fixed-footer" >
                                                    <div class="modal-content">
                                                        <div className='modal-content-div'>
                                                            <img className='modalimg materialboxed responsive-img' src={item.photo} alt={item.postedBy.name} />
                                                        </div>
                                                        <div className='modal-content-div' style={{ padding: "20px" }}>
                                                            <h4>
                                                                <Link to={item.postedBy._id !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
                                                                    <div class="chip">
                                                                        <img style={{ border: "2px solid #ff8a80" }} src={item.postedBy.photo} alt={item.postedBy.name} />
                                                                        {item.postedBy.name}
                                                                    </div>
                                                                </Link>
                                                                <i class="modal-close  right material-icons">close</i>
                                                            </h4>
                                                            <h5>{item.title}</h5>
                                                            <p>{item.body}</p>
                                                            <div className='comment-box'>
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
                                                            </div>
                                                            <div class="modal-footer">
                                                                <div style={{ float: "left", margin: "5px" }}>
                                                                    {item.likes.includes(state._id)
                                                                        ?
                                                                        /* //display unlike button if liked      */
                                                                        <i className="material-icons tooltipped" data-tooltip="Dislike Post" data-position="top"
                                                                            onClick={() => { unlikePost(item._id) }}
                                                                            style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                                                                            {/* thumb_down */}favorite
                                                                        </i>
                                                                        :
                                                                        /* //display like button if not liked  */
                                                                        <i className="material-icons tooltipped" data-tooltip="Like Post" data-position="top"
                                                                            onClick={() => { likePost(item._id) }}
                                                                            style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                                                                            {/* thumb_up */}favorite_border
                                                                        </i>
                                                                    }
                                                                </div>
                                                                <form onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                    // console.log(e.target[0].value)
                                                                    handleComment(e.target[0].value, item._id);
                                                                    e.target[0].value = '';
                                                                }} style={{ display: 'flex' }}>
                                                                    <input type="text" placeholder='Add a comments' />
                                                                    <button type="submit" style={{ background: "none", border: "none" }}>
                                                                        <i class="material-icons right tooltipped" data-tooltip="Post Comment" data-position="top" style={{ cursor: "pointer" }}>send</i>
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                <div class="fixed-action-btn">
                                    <button class="btn-floating btn-large red">
                                        <i class="large material-icons">add</i>
                                    </button>
                                    <ul>
                                        <li><Link
                                            to="/profile"
                                            class="btn-floating yellow darken-1"><i class="material-icons">person</i></Link>
                                        </li>

                                        <li><Link to="/create" class="btn-floating red"><i class="material-icons">add</i></Link></li>
                                        {/* <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li> */}
                                        {/* <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li> */}
                                    </ul>
                                </div>
                            </div >
                        ) : (
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h1>No posts</h1>
                                {/* <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div> */}
                            </div >
                        )
                    }
                </>
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