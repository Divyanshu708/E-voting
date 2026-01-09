import { useQuery } from "@tanstack/react-query";
// import { getData } from "../utils/axiosMethods";
import axios from "axios";

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      // const res = await getData("http://localhost:8000/api/user/me");
      const res = await axios.get(`http://localhost:8000/api/user/me`, {
        withCredentials: true,
      });

      console.log(res.data);

      return res.data;
    },

    staleTime: 0,
    // cacheTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
