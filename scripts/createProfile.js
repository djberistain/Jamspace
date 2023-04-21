import mysql from 'mysql';

export default function createProfile(req, res) {
  const connection = mysql.createConnection({
    host: 'jamspace.cr06s5mhfxvf.us-east-1.rds.amazonaws.com',
    user: 'admin',
    database: 'jamspace',
    password: 'Jamspace'
  });

  const { email, username, password } = req.body;

  console.log('Request body:', req.body); // log the request body to see if the form data is being received correctly

  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database:', err); // log any errors connecting to the database
      return;
    }

    console.log('Connected to database!'); // log success message if connection is successful

    const query = `INSERT INTO sys.users (email, username, password) VALUES ('${email}', '${username}', '${password}')`;

    connection.query(query, function(err, results, fields) {
      if (err) {
        console.error('Error creating user:', err); // log any errors creating the user
        return;
      }

      console.log('User created successfully!'); // log success message if user creation is successful

      res.status(200).json({ success: true });
    });

    connection.end();
  });
}
