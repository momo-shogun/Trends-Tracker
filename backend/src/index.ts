import express, { Request, Response } from 'express';
import { tweetModel } from './db';
import dotenv from 'dotenv';
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config();
let limit = 100;

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
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
});

app.post('/search', async (req, res) => {
  const search = req.body.search
  const value = trendData.get(search)
  if (!value) {
    res.status(404).json({ error: 'No records' })
    return
  }
  res.json({ count: value?.count, averageSentiment: value?.polarity })
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


const port = 3002;
app.listen(port, () => console.log(`Server listening on port ${port}`));