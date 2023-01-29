import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send({message: 'Server is up'});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});