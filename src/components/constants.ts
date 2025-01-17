import { IAverage, IMember, IMovie, IRate, IUser, IYourRate } from "./interfaces";

export const mockUser: IUser = {
  username: "test",
  first_name: "test",
  id: 0,
};

export const defaultMember: IMember = {
  telegramId: 0,
  username: "",
  firstName: "",
  freshBlood: true,
};

export const defaultMovie: IMovie = {
  id: "",
  kinopoiskId: 0,
  name: "",
  ratings: [],
  posterUrl: "",
  averageRating: 0,
  member: defaultMember,
};

export const defaultRate: IRate = {
  id: null ,
  rating: 0,
  username: "",
  liked: false,
  discussable: false,
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
