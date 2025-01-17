export interface IUser {
  username: string;
  first_name: string;
  id: number;
}

export interface IMember {
  telegramId: number,
  username: string;
  firstName: string;
  freshBlood: boolean;
}

export interface IMovie {
  id: string;
  kinopoiskId: number;
  name: string;
  ratings: IRate[];
  posterUrl: string;
  averageRating: number;
  member: IMember;
}

export class Event {
  movie: IMovie;
  language: string;
  date: string;
  members: [];

  constructor(movie: IMovie, language: string, date: string, members: []) {
    this.movie = movie;
    this.language = language;
    this.date = date;
    this.members = members;
  }

  getYear(): number {
    return Number(this.date.split('-')[0]);
  }

  getMonth(): number {
    return Number(this.date.split('-')[1]);
  }

  getDay(): number {
    return Number(this.date.split('-')[2]);
  }
}

export interface IRate {
  id: null | string;
  rating: number;
  username: string;
  liked: boolean;
  discussable: boolean;
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