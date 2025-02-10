import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { Goal, CalendarEvent } from "@/features/goals/schemas/goalModels";

function generateColorFromId(goalId: number): string {
    const hue = (goalId * 137.508) % 360;
    const saturation = 65;
    const lightness = 45;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function useCalendarEvents(): { calendarEvents: CalendarEvent[] } {
    const { data: goals } = useQuery<Goal[]>({
        queryKey: ["goals"],
        queryFn: () => axiosInstance.get("user/goals").then((res) => res.data),
    });

    const goalColors: { [key: number]: string } = {};

    function getGoalColor(goalId: number): string {
        if (!goalColors[goalId]) {
            goalColors[goalId] = generateColorFromId(goalId);
        }
        return goalColors[goalId];
    }

    const calendarEvents: CalendarEvent[] =
        goals?.flatMap((goal) =>
            goal.tasks.flatMap((task) =>
                (task.timeFrames || []).map((timeFrame) => ({
                    id: `timeframe-${timeFrame.id}`,
                    title: task.name,
                    start: new Date(`${timeFrame.date}T${timeFrame.startTime}`),
                    end: new Date(`${timeFrame.date}T${timeFrame.endTime}`),
                    isTimeFrame: true,
                    taskId: task.id,
                    goalId: goal.id,
                    description: task.description,
                    type: goal.type,
                    color: getGoalColor(goal.id),
                }))
            )
        ) || [];

    return { calendarEvents };
}
