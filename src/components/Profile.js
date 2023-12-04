import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import axios from 'axios';

const Profile = () => {

  const { state, dispatch } = useContext(UserContext);
  const [mypics, setPics] = useState([]);


  useEffect(() => {
    //use axios with http GET request to fetch user post who is logged in 
    axios.get("http://localhost:5234/post/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")//attach token from localstorage
      }
    }).then(response => {
      // console.log(response.data);
      setPics(response.data.myposts)
    })
      .catch(error => {
        console.log(error);
      })
  }, [state, dispatch]);


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
          borderBottom: "1px solid grey"
        }}>
          <div>
            <img style={{ width: "160px", height: "160px", borderRadius: "80px", border: "2px solid black" }}
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
              alt="img1" />
          </div>
          <div>
            <h4>{state ? state.name : "Loading..."}</h4>
            <div style={
              {
                display: "flex",
                justifyContent: "space-between",
                width: "110%"
              }}>
              <h5>{mypics.length} Post</h5>
              <h5>85 followers</h5>
              <h5>95 following</h5>
            </div>
          </div>
        </div>
        <div className='postimages'>
          {
            mypics.map(item => {
              return (
                <img key={item._id} className='post' src={item.photo} alt={item.title} />
              )
            })
          }

        </div>
      </div>

    </div>
  );
};

export default Profile;