import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';


const UserProfile = () => {

    const [userProfile, setProfile] = useState(null);
    // console.log(userProfile)
    //get the user id from routes paramaters
    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();


    useEffect(() => {
        axios.get(`http://localhost:5234/user/byid/${userid}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(response => {
            // console.log(response.data);
            setProfile(response.data);
        }).catch(error => {
            console.log(error);
        })

    }, [userProfile])


    const followUser = (id) => {
        // console.log(id)
        axios.put("http://localhost:5234/user/follow",
            { followId: id },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(res => res.data.followingUser)
            .then((result) => {
                const newData = userProfile.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item
                    }
                });
                setProfile(newData);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const UnFollowUser = (id) => {
        // console.log(id)
        axios.put("http://localhost:5234/user/unfollow",
            {
                unfollowId: id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }
        ).then(response => response.data.followingUser)
            .then(result => {
                // console.log(result);
                const newData = userProfile.map(item => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setProfile(newData);
            }).catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            {userProfile ? (
                //if the user profile is available,display user information
                <div style={{ maxWidth: "800px", margin: "0px auto" }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey",
                        padding: "10px",
                        width: "100%",
                        borderRadius: "20px"
                    }} className='z-depth-1'>
                        <div style={{ width: "30%" }}>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px", border: "2px solid black" }}
                                src={userProfile.user.photo ? userProfile.user.photo : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"}
                                alt="img1" />
                        </div>
                        <div style={{ width: '70%' }}>
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div>
                                    <h4>{userProfile.user.name}</h4>
                                    <h5>{userProfile.user.email}</h5>
                                </div>
                                {userProfile.user.followers.includes(state._id) ? (
                                    <a class="waves-effect waves-light btn red lighten-2" onClick={() => {
                                        UnFollowUser(userProfile.user._id)
                                    }}>
                                        <i class="material-icons right">person</i>UnFollow</a>
                                ) : (
                                    <a class="waves-effect waves-light btn red lighten-2" onClick={() => {
                                        followUser(userProfile.user._id)
                                    }}>
                                        <i class="material-icons right">person_add</i>Follow</a>
                                )}
                            </div>
                            <div style={
                                {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}>
                                <div className='profile-vals'>
                                    <h5>{userProfile.posts?.length}</h5>
                                    <p>posts</p>
                                </div>
                                <div
                                    className='profile-vals'
                                // style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <h5>{userProfile.user.followers?.length}</h5>
                                    <p>followers</p>
                                </div>
                                <div className='profile-vals'>
                                    <h5>{userProfile.user.following?.length}</h5>
                                    <p>following</p>
                                </div>
                                {/* <h5>{userProfile.posts.length} Post </h5> */}
                                {/* <h5>{userProfile.user.followers.length} followers</h5> */}
                                {/* <h5>{userProfile.user.following.length} following</h5> */}
                            </div>
                        </div>
                    </div>

                    <div className='postimages'>
                        {userProfile.posts.map(item => (
                            //map through user post and display the image
                            <img key={item._id} className='post' src={item.photo} alt={item.title} />
                        ))}
                    </div>
                </div>
            ) : (
                <h2>Loading....</h2>
            )};
        </div>
    );
};

export default UserProfile;