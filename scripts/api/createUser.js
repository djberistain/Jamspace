import { query } from 'db.js';

export default async function handler(req, res) {
  const { username, email, password } = req.body;

  try {
    const results = await query(
      `
      INSERT INTO sys.users(username, password, email)
      VALUES (?, ?, ?)
      `,
      [username, password, email]
    );
    return res.status(200).json({ message: 'User created successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
