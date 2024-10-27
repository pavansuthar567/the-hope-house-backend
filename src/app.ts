import express, { Application } from 'express';
import cors from 'cors'; // Ensure cors is imported
import initRoutes from './routes';

const app: Application = express();

app.use(express.json());

// CORS configuration to allow any site
app.use(
  cors({
    origin: '*', // Allow requests from any origin
    credentials: true, // If you need to include credentials
  }),
);

// Routes initialization
initRoutes(app);

export default app;
