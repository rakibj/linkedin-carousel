import axios from "axios";

// Define the API handler for GET requests
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Get query parameters from the URL

  const query = searchParams.get("query") || "background backdrop";
  const page = parseInt(searchParams.get("page") || "1", 1);
  const perPage = parseInt(searchParams.get("perPage") || "10", 10);

  try {
    // Make a request to Pexels API
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query,
        page,
        per_page: perPage,
      },
      headers: {
        Authorization: `Bearer ${process.env.PEXELS_API_KEY}`, // Your Pexels API Key
      },
    });

    // Extract image URLs from the response
    const imageLinks = response.data.photos.map(
      (photo: { src: { medium: string } }) => photo.src.medium
    );

    return new Response(JSON.stringify(imageLinks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching images:", error);

    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
