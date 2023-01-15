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
}

export interface IFormCardData {
  _id: string;
  title: string;
  subTitle: string;
  address: string;
  phone: string;
  image: { url: string; alt: string };
}
