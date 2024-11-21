export type ReviewType = {
  id: number;
  filmId: number;
  rating: number;
  text: string;
  author: string;
  date: string;
}

export type ReviewsType = ReviewType[]
