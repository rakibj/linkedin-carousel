import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const threadId = searchParams.get("threadId");
  if (!threadId)
    return NextResponse.json({ error: "No thread id found" }, { status: 400 });

  const openai = new OpenAI();

  try {
    const result = await openai.beta.threads.messages.list(threadId);
    console.log(result);
    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 200 });
  }
}
