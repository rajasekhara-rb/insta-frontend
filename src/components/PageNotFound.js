import React from 'react';
import M from 'materialize-css';


const PageNotFound = () => {
    M.AutoInit()

    return (
        <>
            <button data-target="modal1" class="btn modal-trigger">Modal</button>

            <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            </div>

        </>
    );
};

export default PageNotFound;