import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { catalogForAi } from "./catalog";

export type Pick = { id: string; reason: string };

export async function recommendProducts(goal: string, note: string): Promise<Pick[]> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI recommendations are not configured.");

  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const catalog = catalogForAi.map((p) => `- ${p.id}: ${p.name} — ${p.about}`).join("\n");
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system:
      "You recommend supplements from True Form Life, a Canadian brand for women 40+. Only choose from the catalog. " +
      "Tone: warm, direct, short sentences, no hype. Never use the words journey, transformation, midlife or broken. No medical claims. " +
      'Reply with JSON only: {"picks":[{"id":"<catalog id>","reason":"<one sentence, under 15 words>"}]}. Pick 2 or 3 products, best first.',
    prompt: `Goal: ${goal}\nShopper note: ${note || "(none)"}\n\nCatalog:\n${catalog}`,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const text = await result.text;
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No recommendations came back. Please try again.");
  const parsed = JSON.parse(match[0]) as { picks?: { id?: unknown; reason?: unknown }[] };
  const valid = new Set(catalogForAi.map((p) => p.id));
  const seen = new Set<string>();
  return (parsed.picks ?? [])
    .filter((p): p is Pick => typeof p.id === "string" && valid.has(p.id) && typeof p.reason === "string")
    .filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)))
    .slice(0, 3)
    .map((p) => ({ id: p.id, reason: p.reason.slice(0, 160) }));
}
