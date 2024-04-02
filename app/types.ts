export interface AlbumShort {
  id: string;
  title: string;
  artist: string;
};

export interface Track {
  albumId: string;
  title: string;
  artist: string;
  length: number;
  trackNumber: number;
};

export interface AlbumFull extends AlbumShort {
  quality: string;
  year: number;
  genre: string;
  tracks: Track[];
}