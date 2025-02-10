import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";

type Task = {
    completed: boolean;
};
  
type Goal = {
    id: number;
    title: string;
    tasks: Task[];
};
export function useUserStats() {
    const { data} = useQuery({
        queryKey: ["goals"],
        queryFn: async () => {
          try {
            const token = localStorage.getItem('jwtToken');
            console.log('Token:', token ? 'exists' : 'missing');
            const response = await axiosInstance.get<Goal[]>("user/goals");
            return response.data;
          } catch (err) {
            console.error("Failed to fetch goals:", err);
            throw err;
          }
        },
    });
    
  
    const goals = data || [];

    const totalGoals = goals.length;
    const totalTasks = goals.reduce((sum, goal) => sum + (goal.tasks?.length || 0), 0);
    const completedTasks = goals.reduce(
      (sum, goal) => sum + (goal.tasks?.filter((task) => task.completed).length || 0),
      0
    );
  
    return {
      totalGoals,
      totalTasks,
      completedTasks,
    };
}