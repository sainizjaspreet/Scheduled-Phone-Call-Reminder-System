# Scheduled Phone Call Reminder System

This is a Next.js app for scheduling automated phone call reminders with retry, escalation, and real-time status tracking. It uses PostgreSQL (via Prisma) and Twilio for calls.

## Quick Start

1. **Install dependencies:**

```bash
npm install
# or
yarn install
```

2. **Set up environment variables:**

- Copy `.env.example` to `.env` and fill in your database and Twilio credentials.

3. **Run migrations:**

```bash
npx prisma generate
npx prisma migrate deploy
# or, for development:
npx prisma migrate dev
```

4. **Start the app:**

```bash
npm run dev
# or
yarn dev
```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Key Commands

| Command                     | Purpose                       |
| --------------------------- | ----------------------------- |
| `npm install`               | Install dependencies          |
| `npx prisma generate`       | Generate Prisma client        |
| `npx prisma migrate deploy` | Apply migrations (prod)       |
| `npx prisma migrate dev`    | Create/apply migrations (dev) |
| `npm run dev`               | Start dev server              |
| `npm run build`             | Build for production          |
| `npm start`                 | Start production server       |

## How It Works

1. Create a reminder in the dashboard.
2. Scheduler processes due reminders and initiates calls via Twilio.
3. User confirms or snoozes via phone call.
4. Status is tracked in real time.

**Note:** For local Twilio development, your app must be publicly accessible (e.g., with ngrok) for webhooks to work.
