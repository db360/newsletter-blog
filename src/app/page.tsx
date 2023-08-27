import { categories } from "../../constants";
import fetchNews from "../../lib/fetchNews";
import NewsList from "./NewsList";
import response from '../../response.json'

export default async function Home() {

  // fetch the news data
  const news: NewsResponse = (await fetchNews(categories.join(',')))  || response
  // console.log(news)
  return (
    <>
      <NewsList news={news}/>
    </>
  )
}

