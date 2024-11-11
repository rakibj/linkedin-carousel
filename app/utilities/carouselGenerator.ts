import { Slide } from "../Slide";
import axios from "axios";

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

    const assistantId = "asst_yANDmEn3nM3EueaegK2KOOhr";

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
export const predefinedFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];
export const predefinedImages = [
  "https://picsum.photos/id/119/500/500?blur=10",
  "https://picsum.photos/id/100/500/500?blur=10",
  "https://picsum.photos/id/130/500/500?blur=10",
  "https://picsum.photos/id/135/500/500?blur=10",
  "https://picsum.photos/id/149/500/500?blur=10",
  "https://picsum.photos/id/171/500/500?blur=10",
  "https://picsum.photos/id/186/500/500?blur=10",
  "https://picsum.photos/id/196/500/500?blur=10",
  "https://picsum.photos/id/210/500/500?blur=10",
  "https://picsum.photos/id/213/500/500?blur=10",
  "https://picsum.photos/id/229/500/500?blur=10",
  "https://picsum.photos/id/249/500/500?blur=10",
  "https://picsum.photos/id/254/500/500?blur=10",
  "https://picsum.photos/id/266/500/500?blur=10",
  "https://picsum.photos/id/282/500/500?blur=10",
  "https://picsum.photos/id/302/500/500?blur=10",
];

export const slideDatabase: Slide[] = [
  {
    id: 1,
    title: "Boost Your LinkedIn Presence",
    content:
      "Learn how to create engaging carousel posts that captivate your audience.",
  },
  {
    id: 2,
    title: "Craft Compelling Content",
    content:
      "Discover the secrets to writing headlines and copy that drive engagement.",
  },
  {
    id: 3,
    title: "Optimize Your Design",
    content:
      "Use eye-catching visuals and layouts to make your carousels stand out.",
  },
  {
    id: 4,
    title: "Measure Your Success",
    content:
      "Track key metrics to continually improve your carousel performance.",
  },
];
