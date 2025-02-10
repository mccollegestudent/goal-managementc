import { z } from "zod";

export const signupFormSchema = z.object({
    email: z
        .string({
            message: "Required",
        })
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z
        .string({
            message: "Required.",
        })
        .min(8, "Password must be at least 8 characters long.")
        .max(30, "Password must be at most 30 characters long.")
        .regex(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^\s]*$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number."
        ),
    firstName: z
        .string({
            message: "Required",
        })
        .min(2, "Must be >2 characters.")
        .max(20, "Must be <20 characters.")
        .regex(
            /^[a-zA-Z]+$/,
            "Must contain only letters."
        ),
    lastName: z
        .string({
            message: "Required.",
        })
        .min(2, "Must be >2 characters.")
        .max(20, "Must be <20 characters.")
        .regex(
            /^[a-zA-Z]+$/,
            "Must contain only letters."
        ),
    confirmPassword: z
        .string({
            message: "Please confirm your password.",
        })
        .min(1, "Please confirm your password."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupFormSchema>;