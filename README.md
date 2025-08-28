# Sarcastic Excuse API

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

An intelligent API that uses Google's Gemini AI to transform boring HTTP status codes into witty, sarcastic, and funny excuses.

## Features

- **AI-Powered Wit**: Dynamically generates unique excuses using the Gemini AI.
- **Context-Aware Humor**: Rewrites standard HTTP messages into sarcastic, GenZ-style humor.
- **Simple REST Interface**: Easy to integrate with any application.
- **Flexible Endpoints**: Get excuses by status code or by describing a situation.

## environment Variables

- **GEMINI_API_KEY** : YOUR_API_KEY
 fill out your api key and you are good to go. But dont hardcode it its not a good practise. make an env and store your secrets there. 

 - Happy Coding :) 

## Technology Stack

- **Backend**: Node.js, Express.js
- **AI**: Google Gemini Pro
- **Dependencies**: `dotenv` for environment variables.

## Setup and Installation

Follow these steps to run the API on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Maryam593/Sarcastic-Excuse-API.git
    cd Sarcastic-Excuse-API
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File:**
    Create a file named `.env` in the root directory and add your Gemini API key:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will be running at `http://localhost:3000`.

## API Documentation

### `GET /error/:code`

Get a sarcastic excuse for a specific HTTP status code.

**Example Request:**
```bash
curl http://localhost:3000/error/404
```

**Example Response:**

```json
{
    "code": 404,
    "message": "I tried to find it, but honestly, I got lost in the digital void. It's probably chilling with the missing socks.",
    "sarcasmLevel": "high"
}
```

### `POST /excuseApi/detect`

Get a sarcastic excuse by providing a status code or a descriptive text.

**Request Body:**

- `responseCode` (number): The HTTP status code.
- `responseText` (string): A simple description like "success" or "error".

**Example Request (using responseText):**

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"responseText":"everything failed badly"}' \
http://localhost:3000/excuseApi/detect
```

**Example Response:**

```json
{
    "code": 500,
    "message": "My server is having a moment. It's not you, it's definitely me. And my questionable life choices.",
    "sarcasmLevel": "high",
    "timestamp": "2025-08-26T20:00:00.000Z"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
