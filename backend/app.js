import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { User } from './user.js'
import { signin } from './jwt.js'
import { auth } from './middleware.js'

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.use(helmet())
app.use(cookieParser());

app.post('/api/auth/login', function (req, res, next) {
	const id = req.body.id
	const password = req.body.password
	
	const user = User.find(e => e.id == id && e.password == password)
	
	if (!user) return res.status(404).json({ "message" : "User not found" });
	
	return res.status(200).json({
		"accessToken" : signin(user)
	});
});

app.get('/api/auth', auth, function (req, res, next) {
	return res.sendStatus(200)
});

app.get('/api/user/profile', auth, function (req, res, next) {
	const user_id = req.user.user_id
	
	const user = User.find(e => e.user_id == user_id)
	
	if (!user) return res.status(404).json({ "message" : "Invalid User" });
	
	return res.status(200).json(user)
});

app.listen(5000, '0.0.0.0', () => {
    console.log("Start!");
})
