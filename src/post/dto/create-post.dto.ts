export class CreatePostDto {
  title: string;
  region: string;
  country: string;
  city: string;
  details: string;
  length_of_stay: {
    months: number;
    weeks: number;
    days: number;
  };
  date_travelled: Date;
  size_of_group: number;
  total_budget: {
    currency: string;
    accommodation: number;
    food_drinks: number;
    activities: number;
    transportation: number;
  };
  slug: string;
}
