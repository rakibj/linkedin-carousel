import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Slide {
  title: string;
  content: string;
}

export async function getSlidesFromAi(
  prompt: string,
  numSlides: number
): Promise<Slide[] | null> {
  console.log("Prompt: " + prompt + "\nNumber of Slides: " + numSlides);
  try {
    const threadResponse = await axios.get("/api/thread/create");
    console.log(threadResponse);
    const threadId = threadResponse.data;
    if (!threadId) throw new Error("Failed to create thread");

    const messageContent = `${prompt}, ${numSlides}`;
    await axios.post(`/api/message/create`, {
      message: messageContent,
      threadId: threadId,
    });

    console.log("message sent");

    const assistantId = "asst_4UtFp2foXiKKPytAoEEYob74";

    const runResponse = await axios.get("/api/run/create", {
      params: {
        threadId: threadId,
        assistantId: assistantId,
      },
    });
    console.log(runResponse);
    const runId = runResponse.data?.id;
    if (!runId) throw new Error("Failed to create run");

    console.log("runId: " + runId);

    let runComplete = false;
    while (!runComplete) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 0.5 seconds
      const runStatusResponse = await axios.get("/api/run/retrieve", {
        params: {
          threadId: threadId,
          runId: runId,
        },
      });
      console.log(runStatusResponse);
      runComplete = runStatusResponse.data.run.status === "completed";
    }

    console.log("run is complete");

    const result = await axios.get("/api/thread/messages", {
      params: { threadId: threadId },
    });

    console.log(
      "###########################################\n" +
        JSON.stringify(result.data, null, 2)
    );

    const assistantMessage = result.data.data.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (message: any) => message.role === "assistant"
    );
    if (assistantMessage) {
      const content = assistantMessage.content[0].text.value;
      console.log("Content:", content);
      const parsedContent = JSON.parse(content);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const slides = parsedContent.slides.map((slide: any) => ({
        title: slide.title,
        content: slide.content,
      }));

      console.log("Slides:", slides);
      return slides;
    } else {
      console.log("No assistant message found.");
    }
  } catch (e) {
    console.log(e);
  }

  return null;
}
