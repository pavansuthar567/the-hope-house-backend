import cors from 'cors';
import passport from 'passport';
import initRoutes from './routes';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import passportConfig from './config/passport';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));
app.use(passport.initialize());
passportConfig(passport);

// CORS configuration to allow any site
app.use(
  cors({
    origin: '*', // Allow requests from any origin
  }),
);

// Routes initialization
initRoutes(app);

export default app;
