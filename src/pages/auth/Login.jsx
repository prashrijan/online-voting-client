import React from "react";
import LoginForm from "../../components/forms/LoginForm";

function Login() {
    return (
        <div className="election-auth-page">
            <div className="election-banner py-4 text-center">
                <h1 className="display-5 mb-3">
                    <span className="election-highlight">
                        Welcome to Chunaab
                    </span>{" "}
                    Voting Platform
                </h1>
                <p className="lead">
                    Your voice matters. Log in to participate!
                </p>
            </div>
            <LoginForm />
        </div>
    );
}

export default Login;
