import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext } from '../App';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Followers = () => {

    const baseUrl = useContext(BaseUrlContext);

    const [followers, setFollowers] = useState([]);
    // console.log(followers);
    useEffect(() => {
        axios.get(`${baseUrl}/user/myfollowers`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            setFollowers(res.data.followers);
        })
    }, [baseUrl])

    return (
        <>
            <div style={{ maxWidth: "800px", maxHeight: "150px", margin: "10px auto" }}>
                {followers.map((follower) => {
                    return (
                        <Link to={`/profile/${follower._id}`} key={follower._id} style={{ margin: "10px" }}>
                            <div class="chip">
                                <img src={follower.photo} alt="Contact Person" />
                                {follower.name}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    );
};

export default Followers;