# Notes App

## Overview

A simple Notes App built with Next.js. Users can create and view notes. All note data is stored in a Neon PostgreSQL database.

## App Idea

This project is a Notes App that allows users to:

* Create new notes
* View existing notes
* Store notes persistently in a database

## Database Access Approach

This project uses **Drizzle ORM** with **Neon PostgreSQL**.

### Why Drizzle ORM?

* Type-safe database queries
* Easy schema management
* Good integration with Next.js and Neon
* Reduces SQL-related errors

## Running Locally

### 1. Install dependencies

```bash
npm install
```

Or install the required database packages:

```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit dotenv
```

### 2. Create environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=your_neon_database_connection_string
```

> Do not commit `.env.local` or any database credentials to GitHub.

### 3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Technologies Used

* Next.js
* React
* Drizzle ORM
* Neon PostgreSQL
* Vercel

## Deployment

The application is deployed on Vercel and connected to Neon PostgreSQL using environment variables.
