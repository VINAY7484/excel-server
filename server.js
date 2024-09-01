import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import requestIp from 'request-ip';
// import winston from 'winston';
// import { logger } from './config/Logger/Winston.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import allRoutes from './src/routes/allRoutes.js';

dotenv.config();
// let baseURl = [];
// if (process.env.NODE_ENV !== 'production') {
//   baseURl.push('http://localhost:5173');
// }
// if (process.env.NODE_ENV === 'production') {
//   baseURl.push('https://b45f-20-104-50-32.ngrok-free.app');
// }

// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

const app = express();

app.use(requestIp.mw());
app.use(express.static('public'));
app.use('/images', express.static('public/assets/images'));
app.use(express.json());
app.use(
    cors({
      credentials: true,
      // origin: baseURl,
    })
  );
  
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
app.use('/api/v1', allRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
