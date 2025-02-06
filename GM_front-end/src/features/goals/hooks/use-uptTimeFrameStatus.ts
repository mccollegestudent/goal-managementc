import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useUptTimeFrameStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      console.log("ID:"+id);
        const resp = await axiosInstance.patch("/user/goal/task/timeframe/status", { id });
        
        return resp.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["goal"]
          });
      console.log("Time slot succesfully updated.")
    },
    onError: (error: AxiosError) => { 
        if(error.status === 403){
            toast.error(error.response?.data as string);
            return;
        }
       toast.error("Time slot status update failed.")
    },
  });
}