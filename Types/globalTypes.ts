export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  user: {
    name: string;
  };
}

export interface RatingStarsProps {
  rating: number;
}
