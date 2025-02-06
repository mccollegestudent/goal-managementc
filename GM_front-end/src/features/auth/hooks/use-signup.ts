import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { SignupSchema } from "../schemas/signup-schema";

export function useSignUp() {
    const router = useRouter();
  return useMutation({
    mutationFn: async (values: SignupSchema) => {
      const resp = await axiosInstance.post("/user/register", values);
      return resp.data;
    },
    onSuccess: () => {
        router.navigate({ to: "/home" });
        toast.success("Account created successfully");
    },
    onError: () => {      
      toast.error("Failed to create account");
    },
  });
}