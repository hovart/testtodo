import React from 'react';

const Skeletons = () => {
    return (
        <div role="status" className="w-full animate-pulse">
            <div className="w-full h-24 my-2 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
            <div className="w-full h-24 my-2 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
            <div className="w-full h-24 my-2 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
            <div className="w-full h-24 my-2 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
            <div className="w-full h-24 my-2 bg-gray-200 rounded-xl dark:bg-gray-700"></div>
            <span className="sr-only">Loading...</span>
        </div>

    );
};

export default Skeletons;