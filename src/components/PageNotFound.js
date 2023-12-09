import React, { useEffect } from 'react';
import M from "materialize-css";


const PageNotFound = () => {

    // document.addEventListener('DOMContentLoaded', function () {
    //     var elems = document.querySelectorAll('.dropdown-trigger');
    //     var instances = M.Dropdown.init(elems, {
    //         onOpenStart: () => {
    //             var instance = M.Dropdown.getInstance(elems);
    //             instance.open();
    //         }
    //     });
    // });

    // const openDropDown = ()=>{
    //     $('.dropdown-button')
    //     .dropdown({
    //             inDuration: 300,
    //             outDuration: 225,
    //             constrainWidth: false, // Does not change width of dropdown to that of the activator
    //             hover: true, // Activate on hover
    //             gutter: 0, // Spacing from edge
    //             belowOrigin: false, // Displays dropdown below the button
    //             alignment: 'left', // Displays dropdown with edge aligned to the left of button
    //             stopPropagation: false // Stops event propagation
    //         }
    //     );
    // }


    return (
        <>
            <div>
                Page Not Found
            </div>


            <div class="fixed-action-btn">
                <a class="btn-floating btn-large red">
                    {/* <i class="large material-icons">mode_edit</i> */}
                    <i class="large material-icons">more_vert</i>
                </a>
                <ul>
                    <li><a class="btn-floating btn red"><i class="material-icons">delete</i></a></li>
                    <li><a class="btn-floating btn red"><i class="material-icons">person</i></a></li>
                    {/* <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                    <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                    <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li> */}
                </ul>
            </div>






            <a class='dropdown-trigger btn' href='#' data-target='postdropdown'
            // onClick={openDropDown}
            >Drop Me!</a>
            <ul id='postdropdown' class='dropdown-content'>
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                {/* <li class="divider" tabindex="-1"></li>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i class="material-icons">cloud</i>five</a></li> */}
            </ul>

        </>

    );
};

export default PageNotFound;