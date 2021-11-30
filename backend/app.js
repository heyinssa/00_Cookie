import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(cors({
	origin: true,
	credentials: true
  }));
app.use(morgan('combined'))
app.use(helmet())
app.use(cookieParser());
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	res.header('Access-Control-Expose-Headers', "Set-Cookie")
	next();
  });

app.get('/api/v1/create', function (req, res, next) {
	var betti = "Betti";
	// expires: new Date(Date.now() + 9000000),
	res.cookie('visitors_no_permanent', "1" , {
		maxAge: 1000 * 60 * 60, 
		sameSite: "none",
		secure: false,
		httpOnly: true,
		signed: false
	});
	console.log(req.cookies);
	
	return res.send('Visitors created! asdf');
});

app.get('/api/v1/read', function(req, res) {
	var visitors = req.cookies.visitors;

    res.send('Visitors: ' + visitors);
});

app.get('/api/v1/update', function(req, res) {
	var visitors = req.cookies.visitors

	if (!visitors) return res.send("No Cookie!")

    var new_value = req.cookies.visitors + "";
	
    res.cookie('visitors', new_value);
    res.send('Visitors updated.');
});

app.get('/api/v1/delete', function(req, res) {
    res.clearCookie('visitors');
    res.send('Visitors deleted.');
});

app.listen(9905, '0.0.0.0')
