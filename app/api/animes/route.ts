import { AnimeType, animeList } from "@/animeList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("nothing");
  console.log(id);
  const animes = animeList;
  return Response.json(animes);
}

function isValidURL(url: string) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

export async function POST(request: Request) {

  const animeBody: AnimeType = await request.json();

  if (!animeBody.name || !isValidURL(animeBody.image)) {
    return Response.error();
  }

  animeList.push(animeBody);

  return Response.json({
    status: 200,
    message: "anime added succesfully",
  });
}
