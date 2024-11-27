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

export const mockUser: IUser = {
  username: "test",
  first_name: "test",
  id: 0,
};

export const defaultMovie: IMovie = {
  id: "",
  kinopoiskId: 0,
  name: "",
  ratings: [],
};
