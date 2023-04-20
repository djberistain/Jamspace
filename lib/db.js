const mysql = require('serverless-mysql');

const db = mysql
(
    {
  config: 
  {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
    }
);

async function query(q, values) 
{
  try 
  {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (e) 
  {
    throw Error(e.message);
  }
}

module.exports = 
{
  query,
};
