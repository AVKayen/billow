import { useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { QueueContext } from "~/components/Queue";
import Icon from "~/components/Icon";
import { useContext } from "react";
import { AlbumFull } from "~/types";
import { ALBUMS, COVERS } from "~/constants";
import Track from "~/components/Track";

export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`${ALBUMS}${params.album}`);
  const data: AlbumFull = await response.json();
  console.log('Loader data:', data); // Add this line
  return data;
};

export default function Album() {
  const album: AlbumFull = useLoaderData();
  const { setQueue } = useContext(QueueContext)!;
  if (!album) return <div>Loading...</div>;
  return (
    <div id="tracklist">
      <div className="album">
        <img src={`${ALBUMS}${album.id}/cover`} alt={album.title} width={200} height={200} />
        <div className="data">
          <div className="main">
            <h1 className="artist">{album.artist}</h1>
            <h1 className="title">{album.title}</h1>
          </div>
          <div className="secondary">
            <p className="year">{album.year} </p>
            <p className="genres">
              {album.genre.split(", ").map((genre: string) => (
                <span key={genre}>{genre}</span>
              ))}
            </p>
            <p className="quality">{album.quality}</p>
            <button onClick={
              () => {
                setQueue(prevQueue => [...prevQueue, ...album.tracks]);
              }
            }>
              <Icon name="add" />
            </button>
            <button onClick={
              () => {
                let shuffled = album.tracks.slice().sort(() => Math.random() - 0.5);
                setQueue(prevQueue => [...prevQueue, ...shuffled]);
              }
            }>
              <Icon name="shuffle" />
            </button>
          </div>
        </div>
      </div>
      <div className="tracklist">
        {album.tracks.map((track) => (
          <Track key={track.title} track={track} />
        ))}
      </div>
    </div>
  );
}