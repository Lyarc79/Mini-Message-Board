const { loadEnvFile } = require("node:process");
loadEnvFile("./config/.env");

const { Client } = require("pg");
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   text TEXT,
   username VARCHAR(50),
   added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username)
VALUES
    ('Hi there!', 'Amando'),
    ('Hello World!', 'Charles');
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
