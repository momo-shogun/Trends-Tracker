import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri: any = process.env.DATABASE_URL

mongoose.connect(uri)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const twtschema = new Schema({}, { strict: false });

export const tweetModel = mongoose.model('clnTweets', twtschema, 'clnTweets');