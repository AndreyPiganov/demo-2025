import { Client } from 'pg';

export default async () => {
  const client = new Client({
    user: 'postgres',
    password: 'uM2twAMWMdaVlB0',
    host: 'localhost',
    port: '5432',
    database: 'family_budget',
  });

  await client.connect();
  return client;
};