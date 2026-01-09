import { useQuery } from "@tanstack/react-query";
import { getData } from "../utils/axiosMethods";
import axios from "axios";

export function useBlockchainById(id) {
  return useQuery({
    queryKey: ["blocks", id],
    queryFn: async () => {
      const res = await getData(
        `${import.meta.env.VITE_API_URL}/api/blockchain/${id}`
      );
      return res.data.data;
    },
    staleTime: 0,
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
  });
}

export function useBlockchainValidate(id) {
  return useQuery({
    queryKey: ["message", id],
    queryFn: async () => {
      const res = await getData(
        `${import.meta.env.VITE_API_URL}/api/blockchain/${id}/validate`
      );

      return res.data.data;
    },

    staleTime: 0,
    refetchInterval: 3000,
    refetchOnWindowFocus: false,
  });
}

export function useHasVoted(campaignId) {
  return useQuery({
    queryKey: ["hasVoted"],
    queryFn: async () => {
      const res = await axios.get(
        `h${
          import.meta.env.VITE_API_URL
        }/api/blockchain/hasVoted?campaignId=${campaignId}`,
        {
          withCredentials: true,
        }
      );

      return res.data;
    },

    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
