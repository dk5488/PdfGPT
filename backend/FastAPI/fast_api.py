from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from PyPDF2 import PdfReader
import requests
from io import BytesIO
from dotenv import load_dotenv
import os
from llama_index.core import Document, VectorStoreIndex, Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.gemini import Gemini
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Environment variable setup
GEMINI_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GEMINI_API_KEY:
    raise ValueError("Missing Google API key. Please set it in the .env file.")

# Configure Google Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Initialize embedding model and LLM
EMBED_MODEL_NAME = "BAAI/bge-small-en-v1.5"
embed_model = HuggingFaceEmbedding(model_name=EMBED_MODEL_NAME)

llm = Gemini(
    api_key=GEMINI_API_KEY,
    model_name="models/gemini-1.5-pro-latest"
)

# Configure LlamaIndex settings
Settings.llm = llm
Settings.embed_model = embed_model

# Pydantic model for incoming requests
class QuestionRequest(BaseModel):
    url: str
    question: str

@app.get("/process")
async def verify():
    """Health check endpoint to verify if the server is running."""
    return {"message": "FastAPI server is running"}

@app.post("/process")
async def process_question(request: QuestionRequest):
    """
    Endpoint to process a question based on the content of a PDF file.
    """
    try:
        # Download the PDF from the URL
        pdf_content = fetch_pdf_content(request.url)

        # Extract text from the PDF
        pdf_text = extract_pdf_text(pdf_content)

        # Create an index and query it
        answer = query_pdf_content(pdf_text, request.question)

        return {"answer": answer}

    except Exception as e:
        # Log error and return as an HTTPException
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


def fetch_pdf_content(url: str) -> bytes:
    """Fetches the PDF content from a given URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.content
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Failed to download PDF: {e}")

def extract_pdf_text(pdf_content: bytes) -> str:
    """Extracts text from a PDF file."""
    try:
        pdf_reader = PdfReader(BytesIO(pdf_content))
        return "".join(page.extract_text() for page in pdf_reader.pages if page.extract_text())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract text from PDF: {e}")

def query_pdf_content(pdf_text: str, question: str) -> str:
    """Creates an index from the PDF text and queries it for an answer."""
    try:
        # Create a Document object
        document = Document(text=pdf_text)

        # Build the index using the embedding model
        index = VectorStoreIndex.from_documents([document], embed_model=embed_model)

        # Query the index with the user's question
        query_engine = index.as_query_engine()
        return str(query_engine.query(question))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process query: {e}")
@app.get("/process")
async def verify():
    print('FastAPI server started')
    return {'message': 'FastAPI server started'}

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI application!"}
