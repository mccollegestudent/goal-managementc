export type Goal = {
    id: number,
    objective: string,
    description: string,
    type: "Routine" | "Target",
    startDate: string,
    endDate: string
    tasks: Task[]
}

export type Task = {
    id: number,
    name: string,
    description: string
    timeFrames: TimeFrame[] | null
}

export type TimeFrame = {
    id: number,
    date: string,
    startTime: string,
    endTime: string,
    status: boolean
}

export type TimeFrameRequest = {
    taskId: number,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
}

export type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    isTimeFrame: boolean;
    taskId: number;
    goalId: number;
    description: string;
    type: "Routine" | "Target";
    color: string;
};