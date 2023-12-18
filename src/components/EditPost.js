import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext } from '../App';
import {  useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const baseUrl = useContext(BaseUrlContext);
    // const [title, setTitle] = useState("");
    // const [body, setBody] = useState("");
    const [post, setPost] = useState();
    console.log(post)

    // const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        axios.get(`${baseUrl}/post/${id}`, {
            //set the header for request
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then(response => {
                const data = response.data;
                // console.log(data);
                if (data.error) {
                    console.log("Something went wrong");
                } else {
                    // navigate("/");
                    setPost(data.post);
                }
            }).catch(error => {
                console.error(error);
            });

    }, [baseUrl, id]);

    const editPost = async () => {
        axios.put(`${baseUrl}/post/update/${id}`,
            {
                post: post.title,
                body: post.body
            },
            {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            }).then((res) => {
                // navigate("/");
                // console.log(res)
                setPost(res.post)
            }).catch((error) => { console.log(error) })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value })
    }


    return (
        <div className="card input-filed editpostcontainer" style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
                <img src={post?.photo} alt='profile' style={{ width: "100%" }} />
            </div>
            <div style={{ width: "50%" }}>
                <p>This feature is under implimentation</p>
                <h6>Editing "post" does not allows you to edit photo at this moment, try deleting post and create new one if required.</h6>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="textarea1">Title</label>
                        <input
                            name='title'
                            type="text"
                            placeholder="Title..."
                            value={post?.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="textarea1">Body</label>
                        <textarea
                            name='body'
                            id='textarea1'
                            class="materialize-textarea"
                            type="text"
                            placeholder="Add your content Here."
                            value={post?.body}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    className="btn waves-effect waves-light #3d5afe indigo accent-3"
                    type="submit"
                    name="action"
                    onClick={editPost}
                >Submit Post
                </button>
            </div>
        </div>
    );
};

export default EditPost;