from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PyPDF2 import PdfReader
import io
import requests
from llama_index.core import Document, VectorStoreIndex, Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.gemini import Gemini
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Configure Google Gemini API key
gemini_api_key = os.getenv('GOOGLE_API_KEY')
if not gemini_api_key:
    raise ValueError("No Google API key found. Please check your .env file.")

# Configure Gemini API
genai.configure(api_key=gemini_api_key)

# Use local embedding model
embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")

# Configure Gemini LLM
llm = Gemini(
    api_key=gemini_api_key,
    model_name="models/gemini-1.5-pro-latest"
)

# Update global settings
Settings.llm = llm
Settings.embed_model = embed_model

# Pydantic model for request
class QuestionRequest(BaseModel):
    url: str
    question: str

@app.post("/process")
async def process_question(request: QuestionRequest):
    try:
        # Download the file from the given URL
        print('Python controller is hit!')
        response = requests.get(request.url)
        response.raise_for_status()  # Raise error if the request fails
        
        pdf_content = response.content

        # Extract text from the PDF
        pdf_reader = PdfReader(io.BytesIO(pdf_content))
        pdf_text = ""
        for page in pdf_reader.pages:
            pdf_text += page.extract_text()

        # Create a Document object directly
        document = Document(text=pdf_text)

        # Build the index with the local embedding model
        index = VectorStoreIndex.from_documents(
            [document], 
            embed_model=embed_model
        )

        # Query the index with the user's question using a query engine
        query_engine = index.as_query_engine()  # Create a query engine
        answer = query_engine.query(request.question)  # Query using the engine

        return {"answer": str(answer)}

    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/process")
async def verify():
    print('FastAPI server started')
    return {'message': 'FastAPI server started'}
