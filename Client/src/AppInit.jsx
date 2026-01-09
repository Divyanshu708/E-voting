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
        const res = await axios.get("http://localhost:8000/api/user/me", {
          withCredentials: true,
        });

        return res.data;
      } catch (err) {
        if (err.response?.status === 401) {
          return null;
        }

        throw err;
      }
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(getMe(data));
    }

    if (data === null) {
      dispatch(logout(data));
    }
  }, [isSuccess, data]);

  return null;
}

export default AppInit;
