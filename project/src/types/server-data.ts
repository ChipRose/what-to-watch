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
  released: number;
  isFavorite: boolean;
  videoLink: string;
  previewVideoLink: string;
};

export type ServerFilmsType = ServerFilmType[];

export type ServerReviewType = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export type ServerReviewsType = ServerReviewType[];
