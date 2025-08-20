export interface IBook {
  id: string;
  title: string;
  description?: string | null;
  price?: number;
}

export interface ICreateBookBody {
  title: string;
  description?: string;
  price?: number;
}

export interface IUpdateBookBody {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
}
