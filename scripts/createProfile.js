import mysql from 'mysql2';

export default async function handler(req, res) {
  const connection = mysql.createConnection({
    host: 'jamspace.cr06s5mhfxvf.us-east-1.rds.amazonaws.com',
    user: 'admin',
    database: 'jamspace',
    password: 'Jamspace'
  });

  const { email, username, password } = req.body;

  connection.query(
    'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    [email, username, password],
    function(err, results, fields) {
      if (err) throw err;
      res.status(200).json({ message: 'User created successfully.' });
      connection.end();
    }
  );
}
