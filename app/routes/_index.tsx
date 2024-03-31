import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { API } from "~/constants";
import { AlbumShort } from "~/types";
import Album from "~/components/Album";

export const loader: LoaderFunction = async () => {
  const response = await fetch(`${API}/albums`);
  const data: AlbumShort[] = await response.json();
  return data;
};

export default function Home() {
  const albums: AlbumShort[] = useLoaderData();

  return (
    <div id="album-list">
      {albums.map((album) => (
        <Album key={album.id} album={album} size={100} />
      ))}

      <br />
      <p>
        KAYENNE:<br />
        -Add search bar [2 views: tracks and albums]<br />
        -volume controls<br />
        -track history<br />
        -modify queue css<br />
        -instant play buttons everywhere<br />
        BE:<br />
        -add db storing<br />
        -cookie caching<br />
        -better optimization of [fetching, caching, etc]<br />
      </p>
        LOSSLESS:<br />
        -new stylesheet<br />
    </div>
  );
}