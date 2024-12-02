**PDF Chat Application (FastAPI + Express Backend with React Frontend)**
========================================================================

This application consists of a **FastAPI** backend (for handling API requests and PDF processing) and an **Express** backend (for managing certain tasks like authentication and routing), connected to a **React** frontend. The system allows users to upload PDF files and chat with them.

* * * * *

**Table of Contents**
---------------------

1.  [Prerequisites](#prerequisites)
2.  [Environment Variables](#environment-variables)
3.  [Setting Up the Backend (FastAPI + Express)](#setting-up-the-backend-fastapi--express)
4.  [Setting Up the Frontend (React)](#setting-up-the-frontend-react)
5.  [Running the Application](#running-the-application)
6.  [Dependencies](#dependencies)

* * * * *

**Prerequisites**
-----------------

Before starting, ensure that you have the following installed:

-   **Node.js** (v14.x or later) - Required for React frontend
-   **Python** (v3.7 or later) - Required for FastAPI backend
-   **PostgreSQL** - Database to store user information and uploaded PDFs
-   **AWS S3** - For storing PDF files
-   **Google API Key** - For Google Cloud integration (if required)

* * * * *

**Environment Variables**
-------------------------

You'll need to set up the following environment variables for both the backend and the frontend.

### **Backend (FastAPI + Express)**

Create a `.env` file in both the **FastAPI** and **Express** directories with the following values:

bash

Copy code

`# FastAPI Backend Environment Variables
DATABASE_URL="xxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION="xxxxxxxxx"
AWS_BUCKET_NAME="xxxxxxxxxxxxxxxxxx"
FASTAPI_URL="xxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxx"
JWT_SECRET="xxxxxxxxxxxxxxxxxxxx"`

### **Frontend (React)**

Create a `.env` file in the **React** directory with the following value:

bash

Copy code

`# React Frontend Environment Variables
REACT_APP_BASE_URL="http://localhost:3000/api"`

* * * * *

**Setting Up the Backend (FastAPI + Express)**
----------------------------------------------

### 1\. **FastAPI Backend**

#### Install Dependencies:

Navigate to the **FastAPI** backend directory and install the required Python dependencies:

bash

Copy code

`cd backend/fastapi
pip install -r requirements.txt`

**Required FastAPI dependencies** (`requirements.txt`):

bash

Copy code

`fastapi
uvicorn
psycopg2
python-dotenv
boto3
requests`

#### Run the FastAPI Server:

Start the FastAPI backend with the following command:

bash

Copy code

`uvicorn main:app --reload`

FastAPI will now be running at `http://localhost:8000`. It will process PDF uploads and handle queries.

* * * * *

### 2\. **Express Backend**

#### Install Dependencies:

Navigate to the **Express** backend directory and install the required Node.js dependencies:

bash

Copy code

`cd backend/express
npm install`

**Required Express dependencies** (`package.json`):

json

Copy code

`{
  "dependencies": {
    "express": "^4.17.1",
    "cors": "^2.8.5",
    "jsonwebtoken": "^8.5.1",
    "dotenv": "^8.2.0",
    "aws-sdk": "^2.930.0",
    "pg": "^8.7.1"
  }
}`

#### Run the Express Server:

Start the Express backend with the following command:

bash

Copy code

`npm start`

Express will now be running at `http://localhost:5000`.

* * * * *

**Setting Up the Frontend (React)**
-----------------------------------

#### Install Dependencies:

Navigate to the **React** frontend directory and install the required dependencies:

bash

Copy code

`cd frontend/react
npm install`

**Required React dependencies** (`package.json`):

json

Copy code

`{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "axios": "^1.2.0",
    "react-router-dom": "^6.3.0",
    "dotenv": "^10.0.0",
    "react-scripts": "^4.0.3"
  }
}`

#### Start the React Application:

Start the React frontend with the following command:

bash

Copy code

`npm start`

React will now be running at `http://localhost:3000`. It will communicate with the Express backend and display the chat interface.

* * * * *

**Running the Application**
---------------------------

Once you have set up both the backend and frontend, follow these steps:

1.  **Start the FastAPI Backend**:

    -   Navigate to the FastAPI directory and run:

        bash

        Copy code

        `uvicorn main:app --reload`

2.  **Start the Express Backend**:

    -   Navigate to the Express directory and run:

        bash

        Copy code

        `npm start`

3.  **Start the React Frontend**:

    -   Navigate to the React directory and run:

        bash

        Copy code

        `npm start`

Now, you can access the frontend at `http://localhost:3000` and interact with the chat interface.

* * * * *

**Dependencies**
----------------

### **Backend (FastAPI + Express)**

-   **FastAPI**: Web framework for building APIs.
-   **uvicorn**: ASGI server to run FastAPI applications.
-   **psycopg2**: PostgreSQL adapter for Python.
-   **boto3**: AWS SDK for Python to interact with AWS S3.
-   **requests**: To make HTTP requests to external APIs.
-   **express**: Web framework for building APIs in Node.js.
-   **jsonwebtoken**: For generating and verifying JWT tokens.
-   **cors**: To enable Cross-Origin Resource Sharing in Express.
-   **pg**: PostgreSQL client for Node.js.
-   **dotenv**: To manage environment variables.

### **Frontend (React)**

-   **react**: JavaScript library for building user interfaces.
-   **axios**: Promise-based HTTP client for making requests.
-   **react-router-dom**: DOM bindings for React Router, enabling routing in the frontend.
-   **react-scripts**: Scripts and configuration used by Create React App.
-   **dotenv**: To manage environment variables.

* * * * *

**Useful Links**
----------------

-   **FastAPI Documentation**: https://fastapi.tiangolo.com/
-   **Express Documentation**: <https://expressjs.com/>
-   **React Documentation**: <https://reactjs.org/>
-   **AWS S3 SDK**: <https://aws.amazon.com/sdk-for-python/>
-   **PostgreSQL Documentation**: <https://www.postgresql.org/docs/>
-   **JWT Documentation**: <https://jwt.io/>
