import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/axiosMethods";
import axios from "axios";

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/campaigns/`,
        {
          withCredentials: true,
        }
      );
      return res.data.data.campaigns;
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

export function useCampaignById(id) {
  return useQuery({
    queryKey: ["campaigns", id],
    queryFn: async () => {
      const res = await getData(
        `${import.meta.env.VITE_API_URL}/api/campaigns/${id}`
      );
      return res.data.data.campaigns;
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}

export function useCampaignResults(id) {
  return useQuery({
    queryKey: ["campaigns", id],
    queryFn: async () => {
      const res = await getData(
        `${import.meta.env.VITE_API_URL}/api/campaigns/${id}/results`
      );
      return res.data.data;
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
}
