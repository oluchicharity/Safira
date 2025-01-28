import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 2001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to SAFIRA!! (SAFE & ALERT)');
});

const mongodb = process.env.MONGO_URI || 'mongodb+srv://agbakwuruoluchi29:vefCHcnf5Wd5nBvH@cluster0.8l6qf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions).then(() => {
  console.log('SAFIRA is Connected to the Database');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

app.listen(port, () => {
  console.log(`SAFIRA is running on port ${port}`);
});

export default app; 
