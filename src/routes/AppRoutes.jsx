import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layout/DefaultLayout";
import Homepage from "../pages/home/Homepage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRoutes = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Homepage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Route>
            {/* private routes */}
            <Route path="/user" element={<ProtectedLayout />}>
                <Route index element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
