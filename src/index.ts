import app from './app';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
connectDB();

console.log('process.env.PORT', process.env.PORT)

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
