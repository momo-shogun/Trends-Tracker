"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
dotenv_1.default.config();
let limit = 50;
let trendData = new Map();
// Load environment variables from .env file
app.get('/trending', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tweets = yield db_1.tweetModel.find({}, 'cleaned_text polarity').limit(limit);
        if (!tweets || tweets.length === 0) {
            res.json({ message: "No data found" });
            return;
        }
        tweets.forEach((tweet) => {
            //@ts-ignore
            tweet.cleaned_text.toLowerCase().split(/\s+/).forEach((word) => {
                if (!trendData.get(word)) {
                    trendData.set(word, { polarity: 0, count: 0 });
                }
                let prevValue = trendData.get(word);
                if (prevValue) {
                    prevValue.count++;
                    //@ts-ignore
                    prevValue.polarity += tweet.polarity;
                }
            });
        });
        const sortedWords = [...trendData.entries()]
            .sort((a, b) => b[1].count - a[1].count) // Sort by count
            .map(([word, data]) => ({ word, count: data.count, averageSentiment: data.polarity / data.count }));
        const top10 = sortedWords.slice(0, 10);
        limit += 100;
        res.json(top10);
    }
    catch (error) {
        console.error(error);
        res.status(250).json({ error: 'Failed to fetch trending topics' });
    }
}));
app.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.body.search;
    const searchedTrend = new Map();
    try {
        let tweets = yield db_1.tweetModel.find({}).limit(limit);
        if (!tweets || tweets.length === 0) {
            res.json({ message: "No data found" });
            return;
        }
        tweets.forEach((tweet) => {
            //@ts-ignore
            tweet.cleaned_text.toLowerCase().split(/\s+/).forEach((word) => {
                if (!searchedTrend.get(word)) {
                    searchedTrend.set(word, { polarity: 0, count: 0, likes: 0, retweets: 0 });
                }
                let prevValue = searchedTrend.get(word);
                if (prevValue) {
                    prevValue.count++;
                    prevValue.polarity += tweet.polarity;
                    prevValue.likes += tweet.Likes;
                    prevValue.retweets += tweet.Retweets;
                }
            });
        });
        const sortedWords = [...searchedTrend.entries()]
            .map(([word, data]) => ({ word, count: data.count, averageSentiment: data.polarity / data.count, avgLikes: data.likes / data.count, avgRetweets: data.retweets / data.count }));
        const result = sortedWords.filter((e) => e.word === search);
        if (!result) {
            res.json({ error: 'Doesnt exits' });
            return;
        }
        res.json(result[0]);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}));
app.get('/frequentPostiveWords', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = new Map();
    try {
        // 1. Fetch tweets with positive sentiment (adjust threshold as needed)
        const positiveTweets = yield db_1.tweetModel.find({ polarity: { $gt: 0.5 } }, 'cleaned_text polarity ').limit(limit);
        // 3. Sort by frequency, then sentiment score if you want more highly rated results to rank higher
        const sortedWords = [...result.entries()]
            .sort((a, b) => b[1].polarity - a[1].polarity)
            .map(([word, data]) => ({ word, count: data.count, averageSentiment: data.polarity / data.count })); //average sentiment included
        // 4.  Send the result (you may limit the number of results for better display/processing if needed).
        res.json(sortedWords);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
