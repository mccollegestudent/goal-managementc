import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { GoalSchema } from "../schemas/Goal-schema";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

export function useAddGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: GoalSchema) => {
        const formattedValues = {
            ...values,
            startDay: format( values.startDay, 'yyyy-MM-dd'),
            endDay: format( values.endDay, 'yyyy-MM-dd'),
          };
        const resp = await axiosInstance.post("/user/goal", formattedValues);
        return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:["goal"]
      });
      toast.success("Goal added.")
    },
    onError: () => {
      
      console.error("Failed to add Goal.");
    },
  });
}