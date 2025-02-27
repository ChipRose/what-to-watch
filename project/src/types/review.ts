export type ReviewType = {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
}

export type ReviewsType = ReviewType[];
