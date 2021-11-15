import createConnectionPool, { sql } from '@databases/pg';
import { Handler } from '@netlify/functions'
import dotenv from 'dotenv';

// Read environment variables from .env file
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

export const handler: Handler = async (event, context) => {
  // Establish connection with database
  const db = createConnectionPool(
    `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  );

  // Send SQL query to database
  const results = await db.query(sql`
    SELECT * FROM todos
  `);

  // Terminate connection with database
  await db.dispose();
  
  // Create HTTP response
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(results),
  }
}
