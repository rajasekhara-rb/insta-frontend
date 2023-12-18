import React, { useContext, useEffect, useState } from 'react';
import { BaseUrlContext, UserContext } from '../App.js';
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

const Profile = () => {
  const { state } = useContext(UserContext);
  const baseUrl = useContext(BaseUrlContext);
  // console.log(state)
  // const navigate = useNavigate();
  // const [mypics, setPics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);
  // console.log(profile)
  const [proflephotos, setProfilePhotos] = useState([]);
  // console.log(proflephotos)

  // useEffect(() => {
  //   //use axios with http GET request to fetch user post who is logged in 
  //   axios.get("http://localhost:5234/post/", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + localStorage.getItem("jwt")//attach token from localstorage
  //     }
  //   }).then(response => {
  //     // console.log(response.data);
  //     setPics(response.data.myposts)
  //   })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // }, [state, dispatch]);


  useEffect(() => {
    axios.get(`${baseUrl}/user/byid/${state?._id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(response => {
      // console.log(response.data);
      setProfile(response.data.user);
      setPosts(response.data.posts);
      setProfilePhotos(response.data.user.prevPhotos)
      // setContextPosts(response.data.posts);
    }).catch(error => {
      console.log(error);
    })

  }, [state, baseUrl]);

  return (
    <div>
      {/* profile */}

      {/* <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src=""/>
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">Card Title
                    <i class="material-icons right">more_vert</i>
                    </span>
                    <p><a href="#">This is a link</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">Card Title
                    <i class="material-icons right">close</i>
                    </span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                </div>
            </div> */}

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
            <img style={{ width: "160px", height: "160px", borderRadius: "80px", border: "10px solid #ff8a80" }}
              src={profile.photo ? profile.photo : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-male-icon.png"}
              alt="img1" />
            {/* <i className="material-icons">
              photo_camera
            </i> */}
          </div>
          <div style={{ width: '70%' }}>
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
              <h4>{profile.name ? profile.name : "Loading..."}</h4>
              <Link to="edit" class="waves-effect waves-light btn red lighten-2"
              //  onClick={() => {navigate("/editprofile")}}
              >
                <i class="material-icons right">edit</i>Edit</Link>
            </div>
            <div style={
              {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                // fontWeight: "bold"
              }}>
              <div className='profile-vals'>
                <h5>{posts?.length}</h5>
                <p>posts</p>
              </div>
              <div
                className='profile-vals'
              // style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
              >
                <h5>{profile.followers?.length}</h5>
                <p>followers</p>
              </div>
              <div className='profile-vals'>
                <h5>{profile.following?.length}</h5>
                <p>following</p>
              </div>
            </div>
          </div>
        </div>

        <ul className='profile-tabs tabs no-autoinit'>
          <li className='tab no-autoinit'><Link to="posts">Posts</Link></li>
          <li className='tab no-autoinit'><Link to="oldprofiles">Profile Photos</Link></li>
          <li className='tab no-autoinit'><Link class="active" to="followers">Followers</Link></li>
          <li className='tab no-autoinit'><Link to="following">Following</Link></li>
        </ul>
        {/* <div id="test-swipe-1" class="col s12 blue">Test 1</div>
        <div id="test-swipe-2" class="col s12 red">Test 2</div>
        <div id="test-swipe-3" class="col s12 green">Test 3</div> */}

        {/* <div className='postimages'>
          {
            posts.map(item => {
              return (
                <img key={item._id} className='post materialboxed' src={item.photo} alt={item.title} />
              )
            })
          }
        </div> */}
      </div>
      <Outlet context={[posts, proflephotos]} className="no-autoinit" />

    </div>
  );
};

export default Profile;