import express, { Request, Response, NextFunction }  from 'express';
import routes from './shared/routes/index';
import AppError from './shared/errors/AppError';

import './shared/infra/database/index';
import ValidationError from './shared/errors/ValidationError';
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

  if (err instanceof ValidationError) {        
    return response.status(err.statusCode).json({
      status: 'validations error',
      errors: err.errors
    })
  }

  console.log(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, ()=> {
  console.log(' 🚀 server stared on port 3333 🚀')
})