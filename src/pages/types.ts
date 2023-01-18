export interface ICardData {
  _id: string;
  title: string;
  subTitle: string;
  address: string;
  phone: string;
  image: { url: string; alt: string };
  bizNumber: string;
  createdAt: Date;
  user_id: string;
  is_favorite: boolean;
}

export interface IFormCardData {
  _id: string;
  title: string;
  subTitle: string;
  address: string;
  phone: string;
  image: { url: string; alt: string };
}

export interface IFavoriteCardData {
  _id: string;
  user_id: string;
  card_id: string;
}
