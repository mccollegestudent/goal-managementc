import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { TaskSchema } from "../schemas/Task-schema";

export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: TaskSchema) => {
        
        const resp = await axiosInstance.post("/user/goal/task", values);
        return resp.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey:["goal"]
          });
      toast.success("Task added.")
    },
    onError: () => {
      
      console.error("Failed to add Task.");
    },
  });
}