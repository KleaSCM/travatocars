import { NextApiRequest, NextApiResponse } from 'next';

export interface User {
  username: string;
  password: string;
}

const loginHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const user: User = req.body;

    if (user.username === 'admin' && user.password === 'password') {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default loginHandler;
