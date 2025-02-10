import { axiosInstance } from "@/lib/axios-config";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Goal } from "../schemas/goalModels";

export function useGoals(): UseQueryResult<Goal[]> {

  const queryClient = useQueryClient();
  

  return useQuery({
    queryKey: ["goal"],
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get("/user/goals");
        return resp.data;
      } catch (e) {
        console.error(e);
        console.error("Failed to fetch ticket data.");
        queryClient.invalidateQueries();
        return null;
      }
    },
  });
}