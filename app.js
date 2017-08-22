var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

//set up template engine
app.set('view engine', 'ejs');

//statiic file
app.use('/assets',express.static('./public'));

//fire controllers
todoController();


//listen port 3000
app.listen(3000);
console.log('Server started on http://localhost:3000');