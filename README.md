# Codeitup

It is a platofrm like leetcode.

> - The `frontend` folder is the client-side.
> - The `primary-backend` is the main API.
> - The `worker` is for processing submission code.


## How to Setup Locally

### 1. Frontend (Client-side)

```bash
cd frontend
```

Create a `.env` file

```bash
NEXT_PUBLIC_BACKEND_URL= 
NEXT_PUBLIC_BACKEND_URL_WS = 
```

For Google Authentication (Optional), create a .env.local:

```bash
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET = 
NEXTAUTH_SECRET = 
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```


### Primary Backend (Main API)

```bash
cd backend/primary-backend
```

Create a `.env` file

```bash
PORT = 4000
DATABASE_URL = 

REDIS_HOST = 
REDIS_QUEUE = 

JWT_SECRET = 

OWNER_EMAIL = YOUR_EMAIL_ID

MAIL_HOST = 
MAIL_USER = 
MAIL_PASS = 

# cloudinary configs

FOLDER_NAME = 
CLOUD_NAME = 
API_KEY = 
API_SECRET = 
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

### Worker

```bash
cd backend/worker
```


Create a `.env` file

```bash
REDIS_HOST = 
REDIS_QUEUE =
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

## Requirements

- Node.js 
- PostgreSQL
- Cloudinary account (for file storage)
- Gmail account (for sending mails)

## Tech Stack

- Frontend: Next.js, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL, Redis
- Worker: Node.js + Redis queue
- File Storage: Cloudinary