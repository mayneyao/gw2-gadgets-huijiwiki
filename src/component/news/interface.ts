export interface INewsItem {
  type: string;
  date: string;
  title: string;
  url: string;
  image: string;
  content: string;
}

export type INews = INewsItem[]
