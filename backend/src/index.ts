import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
