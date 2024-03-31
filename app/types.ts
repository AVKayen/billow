export interface AlbumShort {
  id: string;
  title: string;
  artist: string;
  genres: string[];
  year: number;
};

export interface Track {
  album: string;
  title: string;
  artist: string;
  duration: number;
  track_number: number;
  path: string;
};

export interface AlbumFull extends AlbumShort {
  path: string;
  genre: string[];
  quality: string;
  tracks: Track[];
}