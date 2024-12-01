from textblob import TextBlob
import pandas as pd

def analyze_sentiment():
    try:
        print("Loading cleaned dataset...")
        df = pd.read_csv('cleaned_twitter_dataset.csv')
        print(f"Dataset loaded. First 5 rows:\n{df.head()}")

        def sentiment_analysis(tweet_text):
            analysis = TextBlob(tweet_text)
            return analysis.sentiment.polarity

        print("Analyzing sentiment...")
        df['polarity'] = df['cleaned_text'].apply(sentiment_analysis)
        print(f"Sentiment analysis completed. First 5 rows:\n{df.head()}")

        # Save results
        df.to_csv('sentiment_analyzed_twitter_dataset.csv', index=False)
        print("Sentiment analysis saved to 'sentiment_analyzed_twitter_dataset.csv'.")
    except Exception as e:
        print(f"An error occurred: {e}")

analyze_sentiment()
