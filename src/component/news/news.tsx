import React from 'react';
import useSWR from 'swr'
import { INews, INewsItem } from './interface';


// get news from api
const getNews = async () => {
  return await fetch(NEWS_API).then(response => response.json());
}

const NEWS_API = "https://gw2.wishingstarmoye.com/gw2api/news";



export const News = ({ news }: { news: INewsItem }) => {

  // render news with detail with cover
  return (
    <div>
      <h1>{news.title}</h1>
      <p>{news.content}</p>
      {news.image && <img src={news.image} alt={news.title} />}
    </div>
  )
}

export const NewsList = () => {
  const { data, error } = useSWR<INews>("news", getNews);

  console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // render news with list
  return (
    <div>
      {data.map(news => <News news={news} />)}
    </div>
  )
}

