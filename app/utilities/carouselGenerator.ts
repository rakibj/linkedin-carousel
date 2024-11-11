// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Slide {
  title: string;
  content: string;
}

export function getSlidesFromAi(prompt: string, numSlides: number): Slide[] {
  console.log("" + prompt + "  " + numSlides);
  const slides = [
    {
      title: "Introduction to Unity Netcode",
      content:
        "Unity Netcode is a powerful framework that enables multiplayer game development. It manages network communication efficiently, ensuring fluid gameplay experiences.",
    },
    {
      title: "GameObjects and Networking",
      content:
        "In Unity, GameObjects serve as the foundational elements of your game. Netcode facilitates syncing these objects across clients, allowing for collaborative interactions in real time.",
    },
    {
      title: "Spawning GameObjects",
      content:
        "The spawning system allows developers to create objects dynamically during gameplay. Utilize the Server's authority for spawning and manage client interactions seamlessly.",
    },
    {
      title: "State Synchronization",
      content:
        "Netcode handles the synchronization of GameObject states. This ensures all players see consistent game states, enhancing the overall multiplayer experience.",
    },
    {
      title: "Best Practices for Implementation",
      content:
        "Keep network traffic minimal by optimizing data sent over the network. Leverage Unity's built-in tools to debug and monitor your networking performance efficiently.",
    },
  ];
  return slides;
}
