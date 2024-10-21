import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "required",
  }),
  email: z
    .string({
      required_error: "required",
    })
    .email({
      message: "email-invalid",
    }),
  password: z
    .string({
      required_error: "required",
    })
    .min(6, {
      message: "min-6-characters",
    }),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "required",
    })
    .email({
      message: "email-invalid",
    }),
  password: z
    .string({
      required_error: "required",
    })
    .min(6, {
      message: "min-6-characters",
    }),
});
