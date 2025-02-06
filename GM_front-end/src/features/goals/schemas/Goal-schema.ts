import { z } from "zod";

export const goalSchema = z.object({
    id: z.number().optional(),
    objective: z
        .string({
            message: "Required",
        })
        .min(1, "Required"),
    description: z
        .string({
            message: "Password is required"
        })
        .min(1, "Password is required"),
    startDay: z
        .date(),
    endDay: z
        .date(),
}).refine(data => data.endDay >= data.startDay, {
    message: 'End date must be after start date',
    path: ['endDate'],  // You can specify the path to the error field
});

export type GoalSchema = z.infer<typeof goalSchema>;