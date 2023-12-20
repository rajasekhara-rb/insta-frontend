import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext } from '../App';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Following = () => {

    const baseUrl = useContext(BaseUrlContext);

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}/user/mefollowing`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => {
            setFollowing(res.data.following);
        })
    }, [baseUrl])

    return (
        <>
            <div style={{ maxWidth: "800px", maxHeight: "150px", margin: "10px auto" }}>
                {following.length <= 0 ? (
                    <h5 >Oops! You did not followed anyone</h5>
                ) : (
                    <div>
                        {
                            following.map((user) => {
                                return (
                                    <Link to={`/profile/${user._id}`} key={user._id} style={{ margin: "10px" }}>
                                        <div class="chip">
                                            <img src={user.photo} alt="Contact Person" />
                                            {user.name}
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        </>
    );
};

export default Following;