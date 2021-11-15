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

// GET /todos        => Récupère toutes les tâches à faire
// GET /todos/:id    => Récupère une tâche à faire en particulier
// POST /todos       => Créer une tâche à faire
// PATCH /todos/:id  => Modifier une tâche à faire existante en particulier
// PUT /todos/:id    => Remplacer une tâche à faire existante en particulier
// DELETE /todos/:id => Supprimer une tâche à faire existante en particulier

export const handler: Handler = async (event, context) => {
  // event.body   // Récupère le corps de la requête
  // event.httpMethod   // Récupère la méthode HTTP de la requête
  // event.path   // Récupère l'URL demandée par l'utilisateur

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
