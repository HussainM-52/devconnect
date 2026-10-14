import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
    }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: Number(process.env.DB_PORT || 5432),
    };

const db = new pg.Pool({
  ...config,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

db.on("error", (err) => {
  console.error("PostgreSQL connection error:", err.message);
});

export default db;