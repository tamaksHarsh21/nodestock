// Stock Market Portfolio App
// Harsh Tamakuwala

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// API KEY: pk_d6d9d328b0e7471d9887e1bc15b60a9d (https://iexcloud.io/console/)
// Create Call API Funct
function call_api(finishedAPI,ticker) {
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_d6d9d328b0e7471d9887e1bc15b60a9d',{json: true},(err,res,body) => {
		if (err) {return console.log(err);}
		if (res.statusCode == 200) { 
			//console.log(body);
			finishedAPI(body);
		}
	});
}

// set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is extra stuff"

// Set handle bar index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home',{
    		stock: doneAPI
    	});
	},'fb');
});

// Set handle bar index POST routes
//call_api(fn,req.body.stock_ticker)
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//getMeLookupInput = req.body.stock_ticker;
			res.render('home',{
    		stock: doneAPI,
    		//posted_stuff: getMeLookupInput
    	});
	},req.body.stock_ticker);
});

// Set about page handle bar routes
app.get('/about.html', function (req, res) {
    res.render('about');
});





// set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,() => console.log('Server Listening on Port ' + PORT));