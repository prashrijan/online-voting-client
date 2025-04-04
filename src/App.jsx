import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/layout/DefaultLayout";
import Homepage from "./pages/home/Homepage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <>
            <AppRoutes />
            <ToastContainer />
        </>
    );
}

export default App;
