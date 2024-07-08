import { z } from "zod";

const todoSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Todo's Title is required",
      })
      .min(1, {
        message: "Todo's Title is required",
      }),
  }),
});

export { todoSchema };
