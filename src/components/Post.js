import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BaseUrlContext, UserContext } from '../App';

const Post = () => {
    const { id } = useParams();
    // console.log(id)
    const [post, setPost] = useState();
    console.log(post)
    const baseUrl = useContext(BaseUrlContext);
    const { state } = useContext(UserContext)
    // const state = localStorage.getItem("user")._id

    useEffect(() => {
        const getPost = async () => {
            await axios.get(`${baseUrl}/post/${id}`, {
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
    })


    return (
        <>
            <div id={`${post._id}`} class="modal modal-fixed-footer" >
                <div class="modal-content">
                    <div className='modal-content-div'>
                        <img className='modalimg materialboxed responsive-img' src={post.photo} alt={post.postedBy.name} />
                    </div>
                    <div className='modal-content-div' style={{ padding: "20px" }}>
                        <h4>
                            <Link to={post.postedBy._id !== state._id ? "/profile/" + post.postedBy._id : "/profile"}>
                                <div class="chip">
                                    <img style={{ border: "2px solid #ff8a80" }} src={post.postedBy.photo} alt={post.postedBy.name} />
                                    {post.postedBy.name}
                                </div>
                            </Link>
                            <i class="modal-close  right material-icons">close</i>
                        </h4>
                        <h5>{post.title}</h5>
                        <p>{post.body}</p>
                        <div className='comment-box'>
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
                        </div>
                        <div class="modal-footer">
                            <div style={{ float: "left", margin: "5px" }}>
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
                            </div>
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;