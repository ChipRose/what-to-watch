export type FilmPreview = {
  id: number;
  src: string;
  cover: string;
  poster: string;
  title: string;
}

export type FilmsPreviewList = FilmPreview[]

export type Film = FilmPreview & {
  hero:string;
  rating: number;
  ratingCount: number;
  description: string;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  realized: number;
  similarList: number[];
  reviews: number[];
}

export type FilmList = Film[]
