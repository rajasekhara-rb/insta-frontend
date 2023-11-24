import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../App';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const [data, setData] = useState([]);
    const { state, dispach } = useContext(userContext);
    console.log(data)

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

    const deletePost = () => {

    }

    const unlikePost = () => {

    }

    const likePost = () => {

    }

    const handleComment = () => {

    }

    return (

        <div className='home'>
            {
                data.map(item => {
                    return (
                        <div className='card home-card' key={item._id}>
                            <h5>
                                {/* <Link to={item.postedBy !== state._id ? "/profile/" + item.postedBy._id : "/profile"}>
                                    <h5>{item.postedBy.name}</h5>
                                </Link> */}
                                {/* {item.postedBy._id === state._id && (
                                    <button style={{ float: "right" }}
                                        className="material-icons"
                                        onClick={() => deletePost(item._id)}>
                                        delete
                                    </button>
                                )} */}
                            </h5>


                            <div className='card-image'>
                                <img className='post' src={item.photo} alt="image1" />
                            </div>
                            <div className='card-content'>
                                <i className="material-icons" style={{ color: "red", fontSize: "30px" }}>favorite</i>

                                {/* check if the current user has like post or different user  */}
                                {item.likes.includes(state._id)
                                    ?
                                    /* //display unlike button if liked      */
                                    <button className="material-icons" onClick={() => { unlikePost(item._id) }}>
                                        thumb_down
                                    </button>
                                    :
                                    /* //display like button if not liked  */
                                    <button className="material-icons" onClick={() => { likePost(item._id) }}>
                                        thumb_up
                                    </button>
                                }
                                <h6>Likes:{item.likes.length}</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>

                                {item.comments.map(comment => (
                                    <h6 style={{ fontWeight: "bolder", fontSize: "14px" }} key={comment._id}>
                                        <span style={{ color: "blue", fontSize: "14px" }}>{comment.postedBy.name}:</span>{comment.text}
                                    </h6>

                                ))}

                                {/* logic for comments  */}
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log(e.target[0].value)
                                    handleComment(e.target[0].value, item._id);
                                    e.target[0].value = '';
                                }} >
                                    <input type="text" placeholder='Add a comments' />
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Home;