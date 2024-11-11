import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  const runId = searchParams.get("runId");

  if (!threadId)
    return NextResponse.json(
      { error: "No thread id provided" },
      { status: 400 }
    );
  if (!runId)
    return NextResponse.json({ error: "No run id provided" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const run = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log(run);
    return NextResponse.json({ run: run }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
