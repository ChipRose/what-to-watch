export type ServerFilmType = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  realized: number;
  isFavorite: boolean;
  videoLink: string;
  previewVideoLink: string;
};

export type ServerFilmsType = ServerFilmType[];
