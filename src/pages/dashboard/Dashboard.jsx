import React, { useEffect, useState } from "react";
import { fetchUserApi } from "../../features/user/userApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);

    console.log(user);
    return <div>{user.fullName} hello</div>;
};

export default Dashboard;
