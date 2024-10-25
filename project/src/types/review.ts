export type Review = {
  id: number;
  filmId: number;
  rating: number;
  text: string;
  author: string;
  date: Date;
}

export type ReviewsList = Review[]
