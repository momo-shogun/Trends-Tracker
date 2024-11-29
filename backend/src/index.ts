import express, { Request, Response } from 'express';
import { tweetModel } from './db';
import dotenv from 'dotenv';
const cors = require('cors')

const app = express();
app.use(cors())

dotenv.config();
let limit = 100;

// Load environment variables from .env file

app.get('/trending', async (req, res) => {
  try {
    let tweets = await tweetModel.find({}, 'cleaned_text').limit(limit);

    if (!tweets || tweets.length === 0) {
      res.json({ message: "No data found" });
      return
    }
    const wordCounts = new Map<string, number>();
    tweets.forEach(tweet => {
      //@ts-ignore

      tweet.cleaned_text.toLowerCase().split(/\s+/).forEach(word => {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
      });
    });

    // const sortedWords = [...wordCounts.entries()].sort(([, countA], [, countB]) => countB - countA);
    // Convert the Map to an array of objects
    const sortedWords = [...wordCounts.entries()]
      .map(([word, count]) => ({ word, count })) // Transform to array of objects
      .sort((a, b) => b.count - a.count); // Sort by count

    const top10 = sortedWords.slice(0, 10);
    limit += 100
    res.json(top10);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
});



const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));