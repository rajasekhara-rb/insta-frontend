import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);

    const [profile, setProfile] = useState([]);
    // console.log(profile);
    const [image, setImage] = useState(null);
    // console.log(image)

    useEffect(() => {
        axios.get(`http://localhost:5234/user/byid/${state?._id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {
            // console.log(response.data);
            setProfile(response.data.user);
            //   setPosts(response.data.posts);
        }).catch(error => {
            console.log(error);
        })

    }, [state]);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            if (image) {
                const data = new FormData();
                data.append("file", image);
                data.append('upload_preset', "instagram");
                data.append('cloud_name', "rajasekhararb");

                const response = await axios.post("https://api.cloudinary.com/v1_1/rajasekhararb/image/upload/", data);
                // console.log(response);
                // .then((res) => {
                //     console.log(res)
                const imageUrl = response.data.secure_url;
                setProfile({ ...profile, photo: imageUrl });
                // })
                // .then((res) => {
                // if (imageUrl) {
            }
            axios.put(`http://localhost:5234/user/editprofile`,
                {
                    name: profile.name,
                    photo: profile.photo,
                    about: profile.about
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
                }).then(response => {
                    // console.log(response.data);
                    setProfile(response.data.user);
                    //   setPosts(response.data.posts);
                    navigate("/profile")
                }).catch(error => {
                    console.log(error);
                })
            // }
            // })
        } catch (error) {
            console.log(error);
        }


    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div class="row"
                style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "25px",
                    border: "1px solid grey",
                    padding: "10px",
                    width: "80%",
                    borderRadius: "20px"
                }}>
                <img
                    style={{ width: "250px" }}
                    src={profile.photo ? profile.photo : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"}
                    alt={profile.name + "profile pic"}
                    class="circle responsive-img">
                </img>
                <form class="col s12"
                // style={{ width: "50%" }}
                >
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="icon_prefix" type="text" class="validate"
                                value={profile.name}
                                name="name"
                                onChange={handleChange}
                            ></input>
                            <label for="icon_prefix">Name</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input disabled id="email" type="email" class="validate"
                                value={profile.email}
                                name="email"
                                onChange={handleChange}
                            />
                            {/* <label for="email">Email</label> */}
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">mode_edit</i>
                            <textarea id="icon_prefix2" class="materialize-textarea"
                                value={profile.about}
                                name="about"
                                onChange={handleChange}
                            />
                            <label for="icon_prefix2">About</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="file-field input-field col s12">
                            <div class="btn">
                                <span>File</span>
                                <input type="file" onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }} />
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" />
                            </div>
                        </div>
                    </div>

                    <button class="btn waves-effect waves-light" type="button" name="action"
                        onClick={updateProfile}
                    >Save
                        <i class="material-icons right">save</i>
                    </button>
                </form>
            </div>
        </div>

    );
};

export default EditProfile;