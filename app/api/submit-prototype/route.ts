import { NextResponse } from "next/server";
import { submitPrototype } from "@/modules";
import type { PrototypeDefinition, ContactLeadInput } from "@/domain";

interface SubmitPrototypeBody {
  prototype: PrototypeDefinition;
  lead: ContactLeadInput;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitPrototypeBody;
    const receipt = submitPrototype(body.prototype, body.lead);

    return NextResponse.json(receipt);
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo registrar el lead.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 },
    );
  }
}
