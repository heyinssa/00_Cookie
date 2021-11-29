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

app.use('/', function (req, res, next) {
	// res.cookie('key', 'value', {
    // 	maxAge:10000
	// });
	return res.send("asdfads");
});

// app.get('/currentcounter', function(req, res) {
//     var visitors = req.cookies.visitors;
//     res.send('Visitors: ' + visitors);
// });

// app.get('/updatevisitors', function(req, res) {
//     var new_value = 38;

//     res.cookie('visitors', new_value);
//     res.send('Visitors updated.');
// });

app.listen(9905, '0.0.0.0', () => {
    console.log("Start!");
})
