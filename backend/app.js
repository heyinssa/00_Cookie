import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
app.use(helmet())
app.use(cookieParser());

app.get('/api/v1/create', function (req, res, next) {
	var visitors = req.cookies.visitors || 0;

	visitors += 1;

	res.cookie('visitors', visitors, {
		maxAge: 1000 * 100,
		path: "/api/v1/delete"
	})
	return res.send('visitors: ' + visitors);
});

app.get('/api/v1/read', function(req, res) {
    var visitors = req.cookies.visitors;
    res.send('Visitors: ' + visitors);
});

app.get('/api/v1/update', function(req, res) {
	var visitors = req.cookies.visitors
	if (!visitors) return res.send("No Cookie!")
    var new_value = 42;
	
    res.cookie('visitors', new_value);
    res.send('Visitors updated.');
});

app.get('/api/v1/delete', function(req, res) {
    // res.clearCookie('visitors');
	res.clearCookie('visitors' , {
		path: "/api/v1/delete"
	});
    res.send('Visitors deleted.');
});

app.listen(9905, '0.0.0.0')
