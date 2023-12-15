import React from 'react';
// import {  useNavigate } from 'react-router-dom';
// import M from 'materialize-css';
const PostDropDown = (props) => {

    // const navigate = useNavigate();
    // console.log(postedById === stateId)
    // console.log(item.postedBy._id, "_", state._id);
    return (
        <>
            <div style={{ padding: "0 10px" }} className="material-icons dropdown-trigger" data-target='dropdown1'>
                <i style={{ float: "right" }} className="material-icons">
                    more_horiz
                </i>
            </div>
            <ul className='dropdown-content' id='dropdown1'>
                <li>
                    {props.item.postedBy._id === props.state._id && (
                        <button
                            className='btn' style={{ margin: 0, width: "100%", height: "100%", padding: 0 }}
                        // onClick={() => deletePost()}
                        // disabled={postedById === stateId ? false : true}
                        >
                            <i style={{ float: "left" }} className="material-icons">
                                delete
                            </i>
                            Delete
                        </button>
                    )}
                </li>
                <li>
                    {/* <button
                        className='btn' style={{ margin: 0, width: "100%", height: "100%", padding: 0 }}
                        // onClick={() => deletePost()}
                        disabled={postedById === stateId ? false : true}
                    >
                        <i style={{ float: "left" }} className="material-icons">
                            edit
                        </i>
                        Edit
                    </button> */}
                </li>
            </ul>

        </>


    );
};

export default PostDropDown;