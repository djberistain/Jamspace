import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  try {
    const results = await query(
      `
      INSERT INTO users (username, password, email)
      VALUES (?, ?, ?)
      `,
      [username, email, password]
    );
    return res.status(200).json({ message: 'User created successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
