import express, { Express, Request, Response } from 'express';
import site_state from './routes/site_state';
import images from './routes/images';
import commissions from './routes/comissions'
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}))
app.use('/state', site_state)
app.use('/images', images)
app.use('/commissions', commissions)


app.set("view_engine", "ejs")
app.get('/', (req: Request, res: Response) => {
  res.send({message: 'Server is up'});
});


app.get('/test', (req, res) => {
  res.render('upload.ejs')
})

app.get('/references', (req, res) => {
  res.render('commissions.ejs')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});