var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended : false});

var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://test:test@ds145010.mlab.com:45010/ashiv-todo');

//schema
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app) {

	app.get('/todo', function(req,res){
		Todo.find({},function(err,data){
			if(err) throw err;
			res.render('todo',{todos:data}); 
		});
	});

	app.post('/todo', urlencodedParser, function(req,res){
		var newTodo = Todo(req.body).save(function(err,data){
			if(err) throw err;
			console.log('New Item Added!');
			res.json(data);
		});
	});

	app.delete('/todo/:item', function(req,res){
		Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if(err) throw err;
			res.json(data);
		});
	});

};