import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { GoalSchema } from "../schemas/Goal-schema";
import { toast } from "sonner";
import { format } from "date-fns";

export function useUptGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: GoalSchema) => {
        const formattedValues = {
            ...values,
            startDay: format(new Date(values.startDay), 'yyyy-MM-dd'),
            endDay: format(new Date(values.endDay), 'yyyy-MM-dd'),
          };
        const resp = await axiosInstance.patch("/user/goal", formattedValues);
        return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["goal"]
      });
      toast.success("Goal updated.")
    },
    onError: () => {
      
      console.error("Failed to update Goal.");
    },
  });
}