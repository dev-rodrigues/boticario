import express  from 'express';
import routes from './routes/index'

import './database';
const app = express()

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }))

app.listen(3333, ()=> {
  console.log(' 🚀 server stared on port 3333 🚀')
})