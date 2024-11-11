import axios from "axios";

const getImageLinks = async (query = "nature", page = 1, perPage = 10) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (photo: { src: { medium: any } }) => photo.src.medium
    );

    return imageLinks;
  } catch (error) {
    console.error("Error fetching images:", error);
    return []; // Return an empty array if an error occurs
  }
};

export default getImageLinks;
