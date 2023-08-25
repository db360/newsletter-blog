import { gql } from "graphql-request"
import sortNewsByImage from "./sortNewsByImages"

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    // GraphQl Query
    const query = gql`
    query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
    ) {
        myQuery(
            access_key: $access_key
            categories: $categories
            countries: "es"
            sort: "published_desc"
            keywords: $keywords
        ) {
          data {
            author
            category
            country
            description
            image
            language
            published_at
            source
            title
            url
          }
          pagination {
            count
            limit
            offset
            total
          }
        }
      }`
    // fetch function with Next13 caching
    const res = await fetch('https://xianju.stepzen.net/api/xrayed-albatross/__graphql',{
        method: 'POST',
        cache: isDynamic ? 'no-cache' : 'default',
        next: isDynamic ? { revalidate: 0 } : { revalidate: 30 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,

        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords
            }
        })
    })

    console.log("LOADING NEW DATA FROM API for category >>> ", category, keywords)

    const newsResponse = await res.json()

    //sort function by images vs not images present
    const news = sortNewsByImage(newsResponse.data.myQuery)

    //return res
    return news
}

export default fetchNews

// example import:
// `stepzen import curl "http://api.mediastack.com/v1/news?access_key=8271f1eb4c298474d33d9a7223225755&countries=es%2Cgb&limit=100&offset=0&sort=published_desc"`