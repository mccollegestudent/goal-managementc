import { axiosInstance } from "@/lib/axios-config";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useAuth(): UseQueryResult<{ email: string, firstName: string ,lastName: string}> {
  const router = useRouter();

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get("/user/me");
        console.log("fetched auth data");
        return resp.data;
      } catch (e) {
        console.error("error auth");
        localStorage.removeItem("jwtToken");
        router.navigate({ to: "/home" });
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}