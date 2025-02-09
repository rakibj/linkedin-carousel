import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI();

  try {
    const thread = await openai.beta.threads.create();
    console.log(thread);
    return Response.json(thread.id, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json({ error: e }, { status: 400 });
  }
}
