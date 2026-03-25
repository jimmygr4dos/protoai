import { NextResponse } from "next/server";
import { applyCustomization } from "@/modules";
import type { PrototypeDefinition } from "@/domain";

interface ApplyCustomizationBody {
  prototype: PrototypeDefinition;
  changes: {
    primaryColor?: string;
    secondaryColor?: string;
    layoutVariant?: string;
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as ApplyCustomizationBody;
  const result = applyCustomization(body.prototype, body.changes);

  return NextResponse.json(result);
}


