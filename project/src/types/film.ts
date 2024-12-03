export type FilmPreviewType = {
  id: number;
  previewSrc: string;
  poster: string;
  title: string;
};

export type FilmsPreviewType = FilmPreviewType[];

export type FilmDescriptionType = {
  director: string;
  description: string;
  starring: string[];
  rating: number;
  ratingCount: number;
};

export type FilmDetailsType = {
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  realized: number;
};

export type FilmType = FilmPreviewType & Omit<FilmDescriptionType, 'rating' | 'ratingCount'> & FilmDetailsType & {
  src: string;
  hero: string;
  cover: string;
};

export type FilmsType = FilmType[];

export type GroupedFilmsType<T> = Record<string, T[]>;

