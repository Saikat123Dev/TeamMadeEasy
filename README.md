# TeamMadeEasy

TeamMadeEasy is a full-stack collaboration platform built with Next.js, TypeScript, Prisma, and MongoDB for seamless team collaboration. It also includes a separate Node.js server for real-time chatting using Socket.io.

## Tech Stack

### Frontend (App Directory)
- **Next.js** with **TypeScript**
- **Prisma** for database management
- **MongoDB** as the database
- **NextAuth.js** for authentication (GitHub, Google OAuth)
- **UploadThing** for file uploads
- **Tailwind CSS** for styling
- **Resend API** for email notifications
- **Gemini & Anthropic AI APIs** for AI-powered features

### Backend (Socket Server)
- **Node.js** with **Express.js**
- **Socket.io** for real-time communication
- **Redis** for message caching
- **Kafka** for event-driven architecture
- **AWS S3** for file storage

---
## Setup Guide

### 1. Setting up the Next.js App

#### Environment Variables
Create a `.env` file in the **`APP` directory** and add the following variables (replace placeholder values accordingly):
```env
DATABASE_URL=
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
AUTH_TRUST_HOST=true
GEMINI_API_KEY=
ANTHROPIC_API_KEY=
NEXT_PUBLIC_SOCKET_URL=http://localhost:8001
NEXT_PUBLIC_GITHUB_TOKEN=
```

#### Install Dependencies
```sh
npm install
```

#### Initialize Prisma
```sh
npx prisma generate
npx prisma db push
```

#### Start the Development Server
```sh
npm run dev
```

---
## 2. Setting up the Socket Server

#### Environment Variables
Create a `.env` file in the **`Server` directory** and add the following variables:
```env
DATABASE_URL=
REDIS_HOST=localhost
REDIS_PORT=6379
KAFKA_BROKER=localhost:9092
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=Global
AWS_S3_BUCKET_NAME=
```

#### Install Dependencies
```sh
npm install
```

#### Initialize Prisma
```sh
npx prisma generate
npx prisma db push
```

#### Start the Socket Server
```sh
npm run dev
```

---
## Features
- **User Authentication** (OAuth with GitHub & Google)
- **Real-time Chat** (Socket.io)
- **AI Integration** (Gemini & Anthropic APIs)
- **Cloud File Uploads** (UploadThing & AWS S3)
- **Database Management** (MongoDB + Prisma)
- **Message Caching & Streaming** (Redis & Kafka)
- **Email Notifications** (Resend API)

## Contributing
Feel free to fork the repository and create a pull request. Make sure to follow the coding guidelines and add meaningful contributions.

## License
This project is licensed under the MIT License.



