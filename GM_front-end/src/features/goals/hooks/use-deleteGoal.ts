import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
        const resp = await axiosInstance.delete("/user/goal", { data: { id } });
        return resp.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["goal"]
          });
      toast.success("Goal succesfully deleted.")
    },
    onError: (error: AxiosError) => { 
        if(error.status === 403){
            toast.error(error.response?.data as string);
            return;
        }
       toast.error("Goal deletion failed.")
    },
  });
}