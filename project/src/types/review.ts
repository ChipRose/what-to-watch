export type ReviewType = {
  id: number;
  connectId: number;
  rating: number;
  text: string;
  author: string;
  date: Date;
}

export type ReviewsType = ReviewType[]
