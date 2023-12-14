import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const baseUrl = useContext(BaseUrlContext);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [post, setPost] = useState();

    const navigate = useNavigate();

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
                console.log(data);
                if (data.error) {
                    console.log("Something went wrong");
                } else {
                    // navigate("/");
                    setPost(data.post);

                }
            }).catch(error => {
                console.error(error);
            });

    }, []);

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
                navigate("/");
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value })
    }


    return (
        <div className="card input-filed postcontainer">
            <h5>Editing post does not allows you to edit photo at this moment</h5>

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
    );
};

export default EditPost;