import { conf } from "../conf/conf";
import { apiProcessor } from "./apiProcessor";

/**
 * Sends a POST request to the authentication API endpoint to register a new user.
 *
 * @async
 * @function signUpUserApi
 * @param {Object} payload - The data to be sent in the request body for user registration.
 *
 * @returns {Promise<Object>} The response from the API, typically containing the result of the registration process.
 * @throws Will log an error to the console if the API request fails.
 */

const authApiEndPoint = conf.baseUrl + "/api/v1/auth";

// signining user
export const signUpUserApi = async (payload) => {
    try {
        const result = await apiProcessor({
            url: authApiEndPoint + "/register",
            method: "POST",
            payload,
            showToast: true,
        });

        return result;
    } catch (error) {
        console.error(error);
    }
};

// logging in user
export const loginUserApi = async (payload) => {
    try {
        const result = await apiProcessor({
            url: authApiEndPoint + "/login",
            method: "POST",
            payload,
            showToast: true,
        });

        return result;
    } catch (error) {
        console.error(error);
    }
};
