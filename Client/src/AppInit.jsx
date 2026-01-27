import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getMe, logout } from "./pages/authSlice";
import axios from "axios";

function AppInit() {
  const dispatch = useDispatch();

  const { isSuccess, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/me`,
          {
            withCredentials: true,
          },
        );

        return res.data;
      } catch (err) {
        console.log("hii3");
        if (err.response?.status === 401) {
          dispatch(logout());
          return null;
        }
        throw err;
      }
    },

    retry: false,
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(getMe(data));
    }
  }, [isSuccess, data, dispatch]);

  return null;
}

export default AppInit;
