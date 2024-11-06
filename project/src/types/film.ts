export type FilmPreview = {
  id: number;
  src: string;
  cover: string;
  poster: string;
  title: string;
}

export type FilmDescription = {
  director: string;
  description: string;
  starring: string[];
  rating: number;
  ratingCount: number;
}

export type FilmsPreviewList = FilmPreview[]

export type Film = FilmPreview & FilmDescription & {
  hero: string;
  runTime: number;
  genre: string;
  realized: number;
  similarList: number[];
  reviews: number[];
}

export type FilmList = Film[]
