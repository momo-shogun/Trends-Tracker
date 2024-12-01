import pandas as pd
from pymongo import MongoClient

def insert_to_mongodb():
    # Load the dataset with sentiment analysis results
    df = pd.read_csv('sentiment_analyzed_twitter_dataset.csv')

    # Connect to MongoDB
    mongo_client = MongoClient('uri')
    db = mongo_client['tweets']  # Replace with your database name
    collection = db['clnTweets']  # Replace with your collection name

    # Convert DataFrame to list of dictionaries
    data = df.to_dict('records')

    # Insert data into MongoDB
    result = collection.insert_many(data)
    print(f"Inserted {len(result.inserted_ids)} documents into MongoDB collection '{collection.name}'.")

insert_to_mongodb()
