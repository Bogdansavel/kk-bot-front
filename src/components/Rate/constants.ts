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
    id: null;
    rating: number;
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

export const defaultRate = {
    id: null,
    rating: 0,
  };
