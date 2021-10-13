import express from 'express';
import routes from './routes';
import cors from 'cors';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT || 3333, () => console.log(`Server is running in PORT=${PORT || 3333}...`));