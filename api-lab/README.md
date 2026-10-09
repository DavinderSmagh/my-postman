# API Lab

API Lab is a clean, modern, functional web application designed for QA engineers and developers to manually send HTTP API requests and inspect responses. It serves as an intuitive alternative to complex API tools, keeping things simple and focusing on essential manual testing capabilities (Phase 1).

## Features
- **HTTP Methods:** Supports `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **URL Input:** Enter any valid API endpoint.
- **Dynamic Parameters & Headers:** Easily add, edit, or disable query parameters and HTTP headers using key/value tables.
- **Request Body:** Support for JSON and raw text bodies.
- **Authentication:** Set up Basic Auth or Bearer tokens.
- **Response Viewer:** View HTTP status codes, response times, response sizes, beautifully formatted JSON responses, and response headers.
- **History & Saved Requests:** Automatically logs your request history and allows saving frequent requests for quick access (stored securely in your browser's local storage).
- **Backend Proxy (CORS Support):** Included Node.js/Express backend proxies requests, bypassing typical browser CORS limitations.

## Tech Stack
- **Frontend:** React, JavaScript, Vite, Tailwind CSS v4, Lucide React (Icons).
- **Backend:** Node.js, Express.js, Axios, CORS.

## Installation & Setup

1. **Clone the repository** (if applicable) and navigate to the root directory `api-lab`.

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```

## How to Run

You need to run both the frontend and the backend simultaneously for the application to work correctly.

**Start the Backend (Proxy Server):**
```bash
cd server
npm start
```
*(The backend runs on `http://localhost:5000`)*

**Start the Frontend:**
```bash
cd client
npm run dev
```
*(The frontend runs on the local Vite port, usually `http://localhost:5173`)*

## Example API Request
Try testing with the JSONPlaceholder API.
1. Select `GET` method.
2. Enter URL: `https://jsonplaceholder.typicode.com/users/1`
3. Click **Send**.
4. Check the Response Viewer to see the user data in a formatted JSON structure.

## Project Structure
```text
api-lab/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── utils/
│   │   │   └── storage.js  # LocalStorage helpers
│   │   ├── App.jsx         # Main React Component
│   │   ├── index.css       # Global styles & Tailwind config
│   │   └── main.jsx        # React entry point
│   └── package.json
├── server/                 # Backend Node.js Proxy
│   ├── controllers/
│   │   └── requestController.js
│   ├── routes/
│   │   └── api.js
│   ├── services/
│   │   └── requestService.js
│   ├── server.js           # Express App Entry
│   └── package.json
└── README.md
```

## Known Limitations (Phase 1)
- **Local Storage Only:** History and Saved Requests are currently stored locally in the browser. Clearing browser data will clear this list.
- **No Advanced Automation:** Test scripts, collection syncing, and cloud environments are not yet supported.
- **Single Request Execution:** Only one request can be processed at a time.
- **Basic Auth Storage:** Authentication credentials are not permanently stored for security reasons, unless explicitly saved in a named request.

## Future Features (Phase 2 & Beyond)
- User Authentication & Cloud Accounts.
- MongoDB Persistence for Requests and History.
- Team Collaboration & Collection Sharing.
- Automated API Test Scripts & CI/CD Integrations.
- Support for GraphQL and WebSocket testing.
- Environment Management (Dev, Staging, Prod).
