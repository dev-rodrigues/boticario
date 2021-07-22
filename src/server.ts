import express, { Request, Response, NextFunction }  from 'express';
import routes from './routes/index';
import AppError from './domain/errors/AppError';

import './database';
const app = express()

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }))
app.use((err: Error, request: Request, response:Response, next: NextFunction)=> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, ()=> {
  console.log(' 🚀 server stared on port 3333 🚀')
})