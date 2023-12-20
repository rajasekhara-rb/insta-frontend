import React from 'react';

const PreLoader = ({ isLoading = false }) => {

    return (
        <div>
            {isLoading ? (
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            ) : ("")}
        </div>
    );
};

export default PreLoader;