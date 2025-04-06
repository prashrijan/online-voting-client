/**
 * Processes API requests using Axios with optional token-based authentication and toast notifications.
 *
 * @async
 * @function apiProcessor
 * @param {Object} options - The configuration options for the API request.
 * @param {string} options.method - The HTTP method to use for the request (e.g., "GET", "POST").
 * @param {string} options.url - The endpoint URL for the API request.
 * @param {Object} [options.payload] - The request payload to send with the API call (for POST/PUT requests).
 * @param {boolean} [options.showToast=false] - Whether to display toast notifications for success or error messages.
 * @param {boolean} [options.isPrivate=false] - Whether the API request requires authentication.
 * @param {boolean} [options.isRefresh=false] - Whether to use the refresh token for authentication.
 * @param {string} [options.contentType="application/json"] - The content type of the request payload.
 * @returns {Promise<Object|Error>} - Resolves with the API response data or rejects with an error object.
 *
 * @throws {Error} Throws an error if the API request fails.
 *
 * @example
 * // Example usage of apiProcessor
 * const response = await apiProcessor({
 *     method: "POST",
 *     url: "/api/v1/login",
 *     payload: { username: "user", password: "pass" },
 *     showToast: true,
 *     isPrivate: false,
 * });
 * console.log(response);
 */
import axios from "axios";
import { toast } from "react-toastify";
import { refreshTokenApi } from "./authApi";
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


        if(errorMessage == "jwt expired"){
            const {data} = await refreshTokenApi()

            data && sessionStorage.setItem("accessToken", data)
                
            return  await apiProcessor({
                url, 
                method, 
                payload, 
                showToast, 
                isPrivate, 
                isRefresh
            })
        }else{
            sessionStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        }
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
