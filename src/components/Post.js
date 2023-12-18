import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseUrlContext, UserContext } from '../App';
import M from 'materialize-css';

const Post = () => {
    M.AutoInit()
    const { id } = useParams();
    console.log(id)
    const [post, setPost] = useState();
    console.log(post)
    const baseUrl = useContext(BaseUrlContext);
    const { state } = useContext(UserContext);
    console.log(state)
    // const state = localStorage.getItem("user")._id

    useEffect(() => {
        const getPost = () => {
            axios.get(`${baseUrl}/post/${id}/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then((res) => {
                console.log(res)
                setPost(res.data.post)
            })
        }

        getPost();
    }, [baseUrl, id])



    return (
        <>
            <div className='card home-card' key={post._id}>
                <h5 style={{ display: "flex", justifyContent: "space-between", padding: "0px 10px", margin: "0", alignItems: "center" }}>
                    <Link to={post.postedBy._id !== state._id ? "/profile/" + post.postedBy._id : "/profile"}
                        style={{ display: 'flex', justifyContent: 'left', alignItems: "center", width: "80%" }}
                    >
                        <img style={{ width: "40px", height: "40px", border: "2px solid #ff8a80" }}
                            class="circle  responsive-img"
                            src={post.postedBy.photo ? post.postedBy.photo : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"}
                            alt='profile' />
                        <h5 style={{ marginLeft: "10px" }}>{post.postedBy.name} {post.postedBy._id === state._id ? "(You)" : ""}</h5>
                    </Link>

                    {/* {post.postedBy._id !== state._id && (
                                            <i style={{ float: "right" }} className="material-icons">
                                                more_horiz
                                            </i>
                                        )} */}
                    {post.postedBy._id === state._id && (
                        <i style={{ float: "right", cursor: 'pointer' }} className="material-icons tooltipped" data-tooltip="Delete Post" data-position="top"
                        // onClick={() => deletePost(post._id)}
                        >
                            delete
                        </i>
                    )}

                    {post.postedBy._id === state._id && (
                        <i style={{ float: "right", cursor: 'pointer' }} className="material-icons tooltipped" data-tooltip="Edit Post" data-position="top"
                        // onClick={() => { navigate(`/editpost/${post._id}`) }}
                        >
                            edit
                        </i>
                    )}
                    {/* <PostDropDown item={item} deletePost={deletePost} state={state} /> */}
                </h5>

                <div className='card-image'>
                    <img data-target={`${post._id}`} className='post materialboxed' src={post.photo} alt="image1" style={{ borderRadius: "2%", cursor: "pointer" }} />
                </div>
                <div className='card-content'>
                    {/* <i className="material-icons" style={{ color: "red", fontSize: "30px" }}>favorite</i> */}

                    {/* check if the current user has like post or different user  */}
                    {post.likes.includes(state._id)
                        ?
                        /* //display unlike button if liked      */
                        <i className="material-icons tooltipped" data-tooltip="Dislike Post" data-position="top"
                            // onClick={() => { unlikePost(post._id) }}
                            style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                            {/* thumb_down */}favorite
                        </i>
                        :
                        /* //display like button if not liked  */
                        <i className="material-icons tooltipped" data-tooltip="Like Post" data-position="top"
                            // onClick={() => { likePost(post._id) }}
                            style={{ color: "red", fontSize: "30px", cursor: "pointer" }}>
                            {/* thumb_up */}favorite_border
                        </i>
                    }

                    {/* new added  */}
                    <span class="activator grey-text text-darken-4" style={{ cursor: "pointer" }}>
                        <i class="material-icons right tooltipped" data-tooltip="Comment Post" data-position="top">chat</i>
                    </span>
                    <p>
                        <span className='left'>{post.likes.length} likes</span>
                        <span className='right'>{post.comments.length} comments</span>
                    </p>
                    <br /><br />
                    <span class="card-title  grey-text text-darken-4">
                        {post.title}
                        {/* <i class="material-icons right">chat</i> */}
                    </span>
                    <p>{post.body}</p>
                    {/* <h6>{post.title}</h6> */}
                    {/* <p>{post.body}</p> */}
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Comments
                        <i class="material-icons right tooltipped" data-tooltip="Close" data-position="top">close</i>
                    </span>
                    {/* <p>Here is some more information about this product that is only revealed once clicked on.</p> */}
                    {post.comments.map(comment => (
                        <h6 style={{ fontWeight: "bolder", fontSize: "14px" }} key={comment._id}>
                            <span style={{ color: "blue", fontSize: "14px" }}>
                                {comment.postedBy._id === post.postedBy._id ?
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
                        // handleComment(e.target[0].value, post._id);
                        e.target[0].value = '';
                    }} style={{ display: 'flex' }}>
                        <input type="text" placeholder='Add a comments' />
                        <button type="submit" style={{ background: "none", border: "none" }}>
                            <i class="material-icons right tooltipped" data-tooltip="Post Comment" data-position="top" style={{ cursor: "pointer" }}>send</i>
                        </button>
                    </form>
                </div>

                {/* modal open opening single post  */}
                {/* <button data-target="modal1" class="btn materialBoxed">Modal</button> */}

            </div>
        </>
    );
};

export default Post;