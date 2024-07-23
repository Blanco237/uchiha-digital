import { AnimeType } from "@/animeList";
import { apiUrl } from "@/constants";

export async function getData() {
  const res = await fetch(`${apiUrl}/api/animes`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function postData(animeObject: AnimeType) {
  const res = await fetch(`/api/animes`, {
    method: "POST",
    body: JSON.stringify(animeObject),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
