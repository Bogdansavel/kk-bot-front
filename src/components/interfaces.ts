export interface IUser {
  username: string;
  first_name: string;
  id: number;
}

export interface IMovie {
  id: string;
  kinopoiskId: number;
  name: string;
  ratings: number[];
}

export interface IRate {
  id: null | string;
  rating: number;
}

export interface IAverage {
  movieName: string;
  rating: number;
}

export interface IYourRate {
    id: string;
    username: string;
    movieId: string;
    rating: number;
    liked: boolean;
    discussable: boolean;
}