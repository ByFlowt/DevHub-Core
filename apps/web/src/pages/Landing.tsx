import React from 'react';
import {useNavigate} from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>DevHub Core</h1>
            <button onClick={() => navigate("/dashboard")} className="border-black border-2">Open</button>
        </div>
    );
};

export default Landing;