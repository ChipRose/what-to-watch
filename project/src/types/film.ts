export type Film = {
  id: number;
  previewSrc: string;
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

export type FilmsPreviewList = Film[]

export type FilmFullInfo = Film & FilmDescription & {
  src: string;
  hero: string;
  cover: string;
  runTime: number;
  genre: string;
  realized: number;
  similarList: number[];
  reviews: number[];
}

export type FilmList = FilmFullInfo[]
