import { z } from "zod";

export const Note = z.object({
  title: z
    .string()
    .min(1, { message: "Note title should contain at least 1 character" }),
  text: z.string().optional(),
});
