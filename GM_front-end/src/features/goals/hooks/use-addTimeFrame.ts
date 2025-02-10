import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { TimeFrameRequest } from "../schemas/goalModels";
import { AxiosError } from "axios";

export function useAddTimeFrame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TimeFrameRequest) => {
        
        const resp = await axiosInstance.post("/user/goal/task/timeframe", values);
        return resp.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["goal"]
          });
      toast.success("Time slot succesfully scheduled.")
    },
    onError: (error: AxiosError) => { 
        if(error.status === 403){
            toast.error(error.response?.data as string);
            return;
        }
       toast.error("Time slot creation failed.")
    },
  });
}