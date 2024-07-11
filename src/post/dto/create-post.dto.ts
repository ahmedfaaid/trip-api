export class CreatePostDto {
  title: string;
  region: string;
  country: string;
  city: string;
  details: string;
  length_of_stay: {
    num: number;
    period: string;
  };
  date_travelled: Date;
  size_of_group: number;
  total_budget: number;
  budget: {
    currency?: string;
    accommodation: number;
    food_drinks: number;
    activities: number;
    transportation: number;
  };
  slug: string;
}
