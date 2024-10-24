export type FilmPreview = {
  id: number;
  src: string;
  cover: string;
  title: string;
}

export type FilmsPreviewList = FilmPreview[]

export type Film = FilmPreview & {
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
