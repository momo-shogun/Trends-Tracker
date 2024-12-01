import express, { Request, Response } from 'express';
import { tweetModel } from './db';
import dotenv from 'dotenv';
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config();
let limit = 50;

export type polarityValue = {
  polarity: number,
  count: number
}

let trendData = new Map<string, polarityValue>()


// Load environment variables from .env file

app.get('/trending', async (req, res) => {
  try {
    let tweets = await tweetModel.find({}, 'cleaned_text polarity').limit(limit);

    if (!tweets || tweets.length === 0) {
      res.json({ message: "No data found" });
      return
    }

    tweets.forEach((tweet) => {
      //@ts-ignore
      tweet.cleaned_text.toLowerCase().split(/\s+/).forEach((word) => {
        if (!trendData.get(word)) {
          trendData.set(word, { polarity: 0, count: 0 })
        }
        let prevValue = trendData.get(word)
        if (prevValue) {
          prevValue.count++
          //@ts-ignore
          prevValue.polarity += tweet.polarity
        }
      })
    })

    const sortedWords = [...trendData.entries()]
      .sort((a, b) => b[1].count - a[1].count)// Sort by count
      .map(([word, data]) => ({ word, count: data.count, averageSentiment: data.polarity / data.count }))

    const top10 = sortedWords.slice(0, 10);
    limit += 100
    res.json(top10);
  } catch (error) {
    console.error(error);
    res.status(250).json({ error: 'Failed to fetch trending topics' });
  }
});

app.post('/search', async (req, res) => {
  const search = req.body.search

  type trendButies = {
    polarity: number,
    count: number
    likes: number,
    retweets: number
  }

  const searchedTrend = new Map<string, trendButies>()

  try {
    let tweets: any = await tweetModel.find({}).limit(limit);

    if (!tweets || tweets.length === 0) {
      res.json({ message: "No data found" });
      return
    }

    tweets.forEach((tweet: any) => {
      //@ts-ignore
      tweet.cleaned_text.toLowerCase().split(/\s+/).forEach((word) => {
        if (!searchedTrend.get(word)) {
          searchedTrend.set(word, { polarity: 0, count: 0, likes: 0, retweets: 0 })
        }
        let prevValue = searchedTrend.get(word)
        if (prevValue) {
          prevValue.count++
          prevValue.polarity += tweet.polarity
          prevValue.likes += tweet.Likes
          prevValue.retweets += tweet.Retweets
        }
      })
    })

    const sortedWords = [...searchedTrend.entries()]
      .map(([word, data]) => ({ word, count: data.count, averageSentiment: data.polarity / data.count, avgLikes: data.likes / data.count, avgRetweets: data.retweets / data.count }))

    const result = sortedWords.filter((e) => e.word === search)
    if (!result) {
      res.json({ error: 'Doesnt exits' })
      return
    }
    res.json(result[0])
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch data' })

  }
})


app.get('/frequentPostiveWords', async (req, res) => {
  let result = new Map<string, polarityValue>()

  try {
    // 1. Fetch tweets with positive sentiment (adjust threshold as needed)
    const positiveTweets = await tweetModel.find({ polarity: { $gt: 0.5 } }, 'cleaned_text polarity ').limit(limit);

    // 3. Sort by frequency, then sentiment score if you want more highly rated results to rank higher
    const sortedWords = [...result.entries()]
      .sort((a, b) => b[1].polarity - a[1].polarity)
      .map(([word, data]) => ({ word, count: data.count, averageSentiment: data.polarity / data.count })); //average sentiment included

    // 4.  Send the result (you may limit the number of results for better display/processing if needed).

    res.json(sortedWords);
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));