import mongoose from 'mongoose';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.warn('Missing DATABASE_URL in .env file');
}

mongoose.connect(DATABASE_URL || 'mongodb://127.0.0.1:27017/churras', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

export default mongoose;