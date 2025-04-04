import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        } else {
            navigate("/login");
        }
    });
    return <div>GoogleAuthSuccess</div>;
};

export default GoogleAuthSuccess;
