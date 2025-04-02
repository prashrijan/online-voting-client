import axios from "axios";
import { toast } from "react-toastify";
export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

export const getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
};

export const apiProcessor = async ({
    method,
    url,
    payload,
    showToast = false,
    isPrivate = false,
    isRefresh = false,
    contentType = "application/json",
}) => {
    try {
        // check if we need to send token in header
        const headers = {};
        let token = null;

        if (isPrivate) {
            if (isRefresh) {
                token = getRefreshToken();
            } else {
                token = getAccessToken();
            }
        }

        headers.authorization = token;
        headers["Content-Type"] = contentType;

        // call the api
        const { data } = await axios({
            method,
            url,
            data: payload,
            headers,
        });

        data &&
            showToast &&
            toast.success(data.message, {
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
            });

        return data;
    } catch (error) {
        console.log(error);

        const errorMessage =
            error.response.data?.message ||
            error.message ||
            "An unknown error occured. Please try again.";

        showToast &&
            toast.error(errorMessage, {
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                progress: undefined,
            });

        return error;
    }
};
