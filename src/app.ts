import cors from 'cors';
import passport from 'passport';
import initRoutes from './routes';
import bodyParser from 'body-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import passportConfig from './config/passport';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import DashboardController from './components/dashboard/dashboard.controller';
// const router = express.Router();

const app: Application = express();

app.use(cors());

/**
 * @route POST /api/webhooks/tradingview
 * @description Receive TradingView alerts via webhook
 * @returns JSON
 * @access Public (but secure with a secret key)
 */
// Mount webhook route before global JSON middleware
app.post(
  '/api/webhooks/tradingview',
  express.text({ type: '*/*' }),
  (req: Request, res: Response, next: NextFunction) => {
    DashboardController.processWebhook(req, res, next);
  }
);

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

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes initialization
initRoutes(app);

export default app;
