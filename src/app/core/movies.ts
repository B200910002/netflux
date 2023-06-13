export interface Rating {
  Value: string;
  Source: string;
}

export interface Movie {
  id: number | null;
  title: string | null;
  year: number | null;
  rated: string | null;
  released: string | null;
  runtime: string | null;
  genre: string | null;
  director: string | null;
  writer: string | null;
  actors: string | null;
  plot: string | null;
  language: string | null;
  country: string | null;
  awards: string | null;
  poster: string | null;
  ratings: Rating[] | null;
  metascore: number | null;
  imdbrating: number | null;
  imdbvotes: number | null;
  imdbid: string | null;
  type: string | null;
  dvd: string | null;
  boxoffice: string | null;
  production: string | null;
  website: string | null;
  response: number | null;
}
