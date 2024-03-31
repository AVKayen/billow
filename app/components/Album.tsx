import { Link } from "@remix-run/react";
import { COVERS } from "~/constants";
import { AlbumShort } from "~/types";


function Album({ album, size: cover_size }: { album: AlbumShort, size: number }) {
    return (
        <Link to={`/album/${album.id}`}>
            <div className="album" style={{ width: `${cover_size}px` }}>
                <img src={`${COVERS}${album.id}?width=${cover_size}&height=${cover_size}`} alt={album.title} width={cover_size} height={cover_size} />
                <span className="artist">{album.artist}</span><span className="title">{album.title}</span>
            </div>
        </Link>
    );
}


export default Album;