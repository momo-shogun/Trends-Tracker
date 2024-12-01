import pandas as pd
import os

def clean_data():
    # Check if the input file exists
    input_file = 'twitter_dataset.csv'
    if not os.path.exists(input_file):
        raise FileNotFoundError(f"Input file '{input_file}' does not exist.")

    print("Loading dataset...")
    df = pd.read_csv(input_file)
    
    # Inspect the dataset structure
    print("Dataset preview:")
    print(df.head())

    # Check if 'Text' column exists
    if 'Text' not in df.columns:
        raise ValueError("Column 'Text' is missing from the dataset.")
    
    # Fill missing values in 'Text' column
    df['Text'] = df['Text'].fillna('')
    
    # Basic pre-processing
    print("Cleaning data...")
    df['cleaned_text'] = df['Text'].str.lower()  # Lowercase
    df['cleaned_text'] = df['cleaned_text'].str.replace(r'http\S+', '', regex=True)  # Remove URLs
    df['cleaned_text'] = df['cleaned_text'].str.replace(r'@\w+', '', regex=True)  # Remove mentions (@user)
    df['cleaned_text'] = df['cleaned_text'].str.replace(r'[^a-zA-Z0-9\s]', '', regex=True)  # Remove punctuation
    df['cleaned_text'] = df['cleaned_text'].str.strip()  # Remove leading/trailing whitespace
    df['cleaned_text'] = df['cleaned_text'].str.replace(r'[\n\t\r]', ' ', regex=True)  # Remove special characters

    # Ensure columns don't have leading or trailing spaces
    df.columns = df.columns.str.strip()

    # Save cleaned data
    output_file = 'cleaned_twitter_dataset.csv'
    df.to_csv(output_file, index=False)

    # Verify file creation
    if not os.path.exists(output_file):
        raise FileNotFoundError(f"Output file '{output_file}' was not created.")

    print(f"Data cleaned and saved to '{output_file}'.")

# Run the function
clean_data()
