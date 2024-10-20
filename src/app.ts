import express, { Application } from 'express';
import initRoutes from './routes';

const app: Application = express();

app.use(express.json());

// Routes initialization
initRoutes(app);

export default app;