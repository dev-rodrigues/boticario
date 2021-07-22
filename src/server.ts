import express, { Request, Response, NextFunction }  from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import AppError from './domain/errors/AppError';

import './database';
import ValidationError from './domain/errors/ValidationError';
const app = express()

app.use(bodyParser.json());
app.use(routes);

app.use((err: Error, request: Request, response:Response, next: NextFunction)=> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  if (err instanceof ValidationError) {        
    return response.status(err.statusCode).json({
      status: 'validations error',
      errors: err.errors
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, ()=> {
  console.log(' 🚀 server stared on port 3333 🚀')
})