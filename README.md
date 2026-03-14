# Foody

Foody is a food ordering application built with React, TypeScript, Redux Toolkit, Vitest, and a small Go API backed by PostgreSQL.

## Features

- Browse menu items across 3 categories: Fast Food, Asian, and Beverages.
- Filter menu items by category.
- Add items to a cart and adjust quantity from the cart only.
- Persist cart contents in `localStorage`.
- Submit orders through the API.
- View submitted order history.
- Clear the full order history.

## Tech Stack

- Client: React, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS, Vitest, React Testing Library
- Server: Go, Fiber, PostgreSQL

## Project Structure

```text
client/   React frontend
server/   Go API + PostgreSQL setup
```

## Prerequisites

- Node.js 20+
- npm
- Go 1.23+
- Docker and Docker Compose

## Running the Application

### 1. Start the backend services

From the `server` directory:

```bash
docker compose up --build
```

This starts:

- PostgreSQL on `localhost:5433`
- Go API on `http://localhost:8000`

The API seeds the menu data automatically on startup.

### 2. Start the frontend

From the `client` directory:

```bash
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` by default and proxies `/api/*` requests to `http://localhost:8000`.

## Running Tests

From the `client` directory:

```bash
npm test
```

Current test coverage focuses on critical behavior:

- app shell navigation
- add-to-cart state changes
- cart quantity updates
- order submission and cart clearing
- history rendering and clear-history action
- cart `localStorage` hydration/persistence

## Build Validation

From the `client` directory:

```bash
npm run build
```

From the `server` directory:

```bash
go build ./...
```

## API Endpoints

- `GET /health`
- `GET /api/menu`
- `GET /api/orders`
- `POST /api/orders`
- `DELETE /api/orders`

## Notes

- Cart data persists in the browser via `localStorage`.
- Order history is stored in PostgreSQL through the Go server.
- Older orders without stored item images are backfilled from the menu table when history is fetched.
