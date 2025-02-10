
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { LoginSchema } from "../schemas/login-schema";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
        const resp = await axiosInstance.post("/user/login", values);
        return resp.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      localStorage.setItem('jwtToken', data.token); 
      router.navigate({ to: "/dashboard" });
    },
    onError: () => {
      
      toast.error("Failed to login.");
    },
  });
}