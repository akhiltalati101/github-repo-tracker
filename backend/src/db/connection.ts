import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Create tables if they don't exist
    await createTables();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const createTables = async () => {
  const createRepositoriesTable = `
    CREATE TABLE IF NOT EXISTS repositories (
      id SERIAL PRIMARY KEY,
      github_id INTEGER UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      description TEXT,
      url VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createReleasesTable = `
    CREATE TABLE IF NOT EXISTS releases (
      id SERIAL PRIMARY KEY,
      repository_id INTEGER REFERENCES repositories(id) ON DELETE CASCADE,
      github_release_id INTEGER UNIQUE NOT NULL,
      tag_name VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      body TEXT,
      published_at TIMESTAMP,
      is_seen BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await client.query(createRepositoriesTable);
  await client.query(createReleasesTable);
};