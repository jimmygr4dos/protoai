import { NextResponse } from "next/server";
import { captureRequest, classifyUserRequest, generatePrototype, validatePrototype } from "@/modules";
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

  if (classification.status !== "valid") {
    return NextResponse.json(
      {
        classification,
        prototypeResult: null,
        validation: null,
      },
      { status: 400 },
    );
  }

  try {
    const normalizedRequest = captureRequest(body);
    const prototypeResult = await generatePrototype(normalizedRequest, { provider });
    const validation = validatePrototype(prototypeResult);

    if (!validation.isValid) {
      console.error("Prototype validation failed", validation.errors);

      return NextResponse.json(
        {
          classification,
          prototypeResult,
          validation,
          error: "No se pudo interpretar correctamente la respuesta de IA. Intenta generar el prototipo nuevamente.",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      classification,
      prototypeResult,
      validation,
    });
  } catch (error) {
    console.error("Prototype generation failed", error);

    return NextResponse.json(
      {
        classification,
        prototypeResult: null,
        validation: null,
        error: "No se pudo interpretar correctamente la respuesta de IA. Intenta generar el prototipo nuevamente.",
      },
      { status: 500 },
    );
  }
}
