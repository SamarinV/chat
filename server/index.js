import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/router.js'

dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use('/api', router);


const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		app.listen(PORT, () => console.log(`server run on PORT: ${PORT}`))
	} catch (e) {
		console.log(e);
	}
}

start();