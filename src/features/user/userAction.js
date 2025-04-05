import { fetchUserApi } from "./userApi";
import { setUser } from "./userSlice";

export const fetchUserAction = () => async (dispatch) => {
    try {
        const { data } = await fetchUserApi();

        console.log(data);

        data && dispatch(setUser(data));
    } catch (error) {
        console.error(error);
    }
};
