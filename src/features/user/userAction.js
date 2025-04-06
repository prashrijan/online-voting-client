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

export const autologin = async (dispatch) => {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  //when access token is available
  if (accessToken) {
    dispatch(fetchUserAction());
    return;
  }

  //when acess token is not available. try to renew from valid refresh token
  //if refresh token is available
  if (refreshToken) {
    try {
      const result = await apiProcessor({
        method: "POST",
        url: "/api/v1/auth/refresh-token",
        payload: { refreshToken },
        isPrivate: true,
        isRefresh: true,
      });

      //if response has access token save it in session storage
      //and dispatch fetch user action
      if (result?.accessToken) {
        sessionStorage.setItem("accessToken", result.acccessToken);
        dispatch(fetchUserAction());
      }
    } catch (error) {
      console.error("Autologin failed with refresh token", error.message);
    }
  }
};
