import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getRecommendations = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ goal: z.string().min(1).max(60), note: z.string().max(300) }).parse(data))
  .handler(async ({ data }) => {
    const { recommendProducts } = await import("./recommend.server");
    try {
      return { picks: await recommendProducts(data.goal, data.note.trim()), error: null as string | null };
    } catch (error) {
      const status = (error as { statusCode?: number })?.statusCode;
      const message =
        status === 429 ? "Lots of people are asking right now. Please try again in a minute."
        : status === 402 ? "Personal picks are paused right now. Please use the picks above."
        : "We couldn't get personal picks right now. Please try again.";
      console.error("recommendations failed", error);
      return { picks: [], error: message };
    }
  });
