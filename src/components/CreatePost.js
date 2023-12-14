import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrlContext } from '../App';

const CreatePost = () => {

    const baseUrl = useContext(BaseUrlContext);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        //check if an image url is available
        if (url) {
            //make a post request to create a new post
            axios.post(`${baseUrl}/post/`, {
                title,
                body,
                photo: url
            }, {
                //set the header for request
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    //check if error
                    if (data.error) {
                        console.log("Something went wrong");
                    } else {
                        //if successful login,navigate to home page
                        navigate("/");
                    }
                }).catch(error => {
                    console.error(error);
                });
        }
    }, [url, body, title, navigate]);

    const postDetails = async () => {
        const data = new FormData();
        console.log(data)
        data.append("file", image);
        // set upload preset 
        data.append('upload_preset', "instagram");
        // set the cloud name 
        data.append('cloud_name', "rajasekhararb");

        try {
            // post request to cloudinary to upload image 
            const response = await axios.post("https://api.cloudinary.com/v1_1/rajasekhararb/image/upload", data)
            // retrive the url of the image uploded secure_url or url
            const imageUrl = response.data.secure_url;
            setUrl(imageUrl);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="card input-filed postcontainer">
            <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                class="materialize-textarea"
                type="text"
                placeholder="Add your content Here."
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn #3d5afe indigo accent-3">
                    <span>Upload</span>
                    <input type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            {/* //display the uploaded image if the url is available  */}
            {url && (
                <img
                    src={url}
                    alt="Uploaded"
                    style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: 'cover'
                    }}
                />
            )}
            <button
                className="btn waves-effect waves-light #3d5afe indigo accent-3"
                type="submit"
                name="action"
                onClick={postDetails}
            >Submit Post
            </button>

        </div>
    );
};

export default CreatePost;