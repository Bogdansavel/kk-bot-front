import { IAverage, IMovie, IRate, IUser, IYourRate } from "./interfaces";

export const mockUser: IUser = {
  username: "test",
  first_name: "test",
  id: 0,
};

export const defaultMovie: IMovie = {
  id: "",
  kinopoiskId: 0,
  name: "",
  photoName: null,
  ratings: [],
};

export const defaultRate: IRate = {
  id: null,
  rating: 0,
};

export const defaultAverage: IAverage = {
  movieName: "?",
  rating: 0,
};

export const defaultYourRate: IYourRate = {
  id: "",
  username: "",
  movieId: "",
  rating: 0,
  liked: false,
  discussable: false,
};
