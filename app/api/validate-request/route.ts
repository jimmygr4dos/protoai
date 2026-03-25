import { NextResponse } from "next/server";
import { classifyUserRequest } from "@/modules";
import { GeminiAIProvider, MockAIProvider } from "@/ai";
import type { RequestInput } from "@/domain";
import { getServerEnv, requireServerEnv } from "@/shared/config/env";

export async function POST(request: Request) {
  const body = (await request.json()) as RequestInput;
  const env = getServerEnv();
  const provider = env.geminiApiKey
    ? new GeminiAIProvider({
        apiKey: requireServerEnv(env.geminiApiKey, "GEMINI_API_KEY"),
        model: env.geminiModel,
      })
    : new MockAIProvider();
  const classification = await classifyUserRequest(body, provider);

  return NextResponse.json(classification);
}
