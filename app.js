var Person = require('./persons');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/persons_db');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
	console.info('Success connection');
});

/* set caching for all static files */
app.use(express.static(__dirname + '/public', {
	setHeaders: function(res, path) {
		res.setHeader('Cache-Control', 'public, max-age=5000');
		// res.setHeader('Expires', 'Sat, 04 Mar 2017 20:01:52 GMT')
	}
}));
app.use(bodyParser.json());


app.get('/', function(req, res) {
	// res.setHeader("Cache-Control", "public, max-age=2592000");
	res.send();
})
 
app.post('/api/create', function(req, res) {
	Person.createDoc(req.body).then(function(data) {
		res.send();
	}).catch(function(err) {
		console.log('Error with creating data, err - ', err);
	});
});

app.get('/api/read', function(req, res) {
	Person.readDoc().then(function(data) {
		res.send(JSON.stringify(data));
	}).catch(function(err) {
		console.log('Error with reading data, err - ', err);
	});
});

app.delete('/api/delete', function(req, res) {
	Person.deleteDoc(req.body).then(function() {
		res.send();
	}).catch(function(err) {
		console.log('Error with deleting data, err - ', err);
	});
});

app.put('/api/update', function(req, res) {
	Person.updateDoc(req.body).then(function() {
		res.send();
	}).catch(function(err) {
		console.log('Error with updating data, err - ', err);
	});
});


app.listen(8080);

console.log('Server is running');



