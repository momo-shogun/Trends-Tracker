# Real-time Social Media Trend Tracker 

![dashboardLight](https://github.com/user-attachments/assets/b2972b81-201c-43e6-98f4-da5785b700fc)


This project is a real-time dashboard visualizing trending topics on social media. It leverages a combination of modern technologies to analyze and present data effectively.  
![dashboardSearch](https://github.com/user-attachments/assets/1f31c35d-6c65-4dad-bc37-6345e1512b9e)

**Key Features:**

* **Real-time Trend Identification:** Tracks most frequent words used in the tweets. The system aims to update regularly depending on the availability of real-time datasets/APIs.
* **Customizable Word Search:** Allows users to search for specific keywords or hashtags and get relevant metrics, like likes and retweets associated with each term.  This features also identifies the frequency for that particular word used among a specified time interval. 
* **Custom Sentiment Analysis:** Provides a sentiment score for keywords to assess public opinion.
* **Engagement Metrics:** Displays average retweets and likes per keyword, showing relative engagement level for each term.
* **Responsive Design:** The user interface adjusts well to various screen sizes.
![graph](https://github.com/user-attachments/assets/aff266ba-6fa2-49fe-acf9-7e2014f13e00)

**Technology Stack:**

* **Frontend:** React.js
* **Programming Lang:** Typescript
* **Backend:** Node.js with Express.js
* **Database:** MongoDB Atlas
* **Data Processing:** Kestra workflow orchestration pipeline for data preprocessing and data cleaning and integration into MongoDb.
* **Sentiment Analysis:** TextBlob


**Data Sources:**
This project currently utilizes a pre-processed dataset from Kaggle https://www.kaggle.com/datasets/goyaladi/twitter-dataset/data?select=twitter_dataset.csv
The dataset contains [brief description of the dataset, including fields relevant to the analysis, number of tweets/posts and the timeframe].  
**Future versions will incorporate real-time APIs from twitter and utilize Kestra for robust data pipelines.**

**Project Architecture:**

The application features a client-server architecture using a streamlined approach appropriate for the scope of the hackathon event. 

1. **Kestra Pipeline:** A Kestra pipeline orchestrates the preprocessing pipeline, and includes multiple data tasks such as:
     * **Data Ingestion:** Reading and managing the loading of the dataset for the initial data population.
     * **Data Cleaning and Transformation:**  Performing data cleaning, such as removing duplicates, irrelevant symbols, null values etc.   Converts into relevant formats for later use in storage and for backend applications.  Additional aspects of this section includes basic data reformatting.
     * **Keyword Extraction:** The step identifies potentially relevant words to keep the final dataset focused and simpler to work with within the limited timeframe.
     * **Data Storage:** Saving this structured data into MongoDB for use by the backend, optimized for rapid information retrieval and use.
2. **Data Storage (Backend):** Processed data (keywords, frequencies, likes, retweets etc.) is saved into a MongoDB Database.
3. **API Endpoint (Backend):** The Node.js backend (using Express.js) provides APIs for accessing the database data via user requests. 
4. **Data Visualization (Frontend):**  The React.js frontend receives data through API calls to create the interactive visualization elements for the final dashboard. 

## How to Run
The dataset and any scripts related to pre-processing would be prepared separately and use kestra to do the Data Preprocessing , the scripts will automatically load the cleaned file in the db instance you provide in the kestra after that do this :-
**1. Clone the Repository:**

```bash
git clone [Your Repository URL]
cd real-time-social-media-trend-tracker
```
2. Install Dependencies:

 ### Backend:
```
cd backend
npm install
```

### Frontend:
```
cd ../frontend
npm install
```
3.Set Environment Variables:
In a .env file add this ```# backend/.env
MONGODB_URI=[Your MongoDB connection string]```

4.Run the Backend and then Frontend using ``` npm run dev ```

**Future Enhancements:**

* Integrate with real-time social media APIs. The integration will incorporate more efficient processing to avoid significant lag when receiving incoming tweets/data for analysis. The current implementation will undergo some updates here by updating this portion to be more continuous in nature.
* Expand sentiment analysis capabilities to perform on a larger dataset and analyze across more metrics.
* Implement more advanced NLP techniques and data visualization techniques to further the complexity of this project.

**Contributors:**

[Krishna S Negi]


**License:**

[MIT License]
