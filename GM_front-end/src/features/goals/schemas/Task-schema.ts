import { z } from "zod";

export const taskSchema = z.object({
    goalId: z.number().optional(),
    id: z.number().optional(),
    name: z
        .string({
            message: "Required",
        })
        .min(1, "Required"),
    description: z
        .string({
            message: "Required"
        })
        .min(1, "Required"),
    
})

export type TaskSchema = z.infer<typeof taskSchema>;