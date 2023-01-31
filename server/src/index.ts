import express, { Express, Request, Response } from 'express';
import site_state from './routes/site_state';
import images from './routes/images';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/state', site_state)
app.use('/images', images)
app.set("view_engine", "ejs")
app.get('/', (req: Request, res: Response) => {
  res.send({message: 'Server is up'});
});


app.get('/test', (req, res) => {
  res.render('upload.ejs')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});