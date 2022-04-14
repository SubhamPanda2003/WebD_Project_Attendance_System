// Require express to make easy
// routing on server side.
const express = require("express");

// Creating express object
const app = express();

// Require path module
const path = require('path');

// Require pug template engine
// const pug = require("pug");
app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Require mongoose to use mongoDb
// in a easier way
const mongoose = require("mongoose");

// Define a port number
const port = 3000;

// Make a static route to use your
// static files in client side
app.use('/static', express.static('static'));

// Middleware for parsing
app.use(express.urlencoded());

// Define and use pug engine so also
// declare path on rendering





app.get('/form', (req, res)=>{
    
    res.status(200).render('form.ejs');
})


app.get('/login', (req, res)=>{
    
    res.status(200).render('login.ejs');
})



// Database Connection
mongoose.connect(
	"mongodb://localhost:27017/db",
	{ useUnifiedTopology: true }
);

// Create schema

const feedSchecma = mongoose.Schema({
	name: String,
	email: String,
	pass: String
});

// Making a modal on our already
// defined schema
const feedModal = mongoose
	.model('students', feedSchecma);


    
    const feedModalT = mongoose
	.model('teachers', feedSchecma);

// Handling get request


// Handling data after submission of form
app.post("/form", function (req, res) {
	const feedData = new feedModal({
		name: req.body.name,
		email: req.body.email,
		pass: req.body.pass
	});
	feedData.save()
		.then(data => {
			res.render('form.ejs',
        { msg: "Your feedback successfully saved." });
		})
		.catch(err => {
			res.render('form.ejs',
				{ msg: "Check Details." });
		});
})


app.get('/formTeacher', (req, res)=>{
    
    res.status(200).render('formTeacher.ejs');
})




app.post("/formTeacher", function (req, res) {
	const feedData = new feedModalT({
		name: req.body.name,
		email: req.body.email,
		pass: req.body.pass
	});
	feedData.save()
		.then(data => {
			res.render('formTeacher.ejs',
        { msg: "Your feedback successfully saved." });
		})
		.catch(err => {
			console.log("Error TeacherForm not submitted");
		});
})
//----------------------------login-----------------------------------------------------
const User = mongoose.model('student', {
    name: String,
    email: String,
     pass: String
});
app.post("/login",function(req,res){
      var name= req.body.name;
		const email= req.body.email;
		const pass= req.body.pass;
        const data = email;

       

     User.findOne({'email' : new RegExp(data, 'i')}, function(err, docs){
    if(docs)       
   {
     if(docs.pass==pass)
    {
        res.status(200).render('Acc.ejs');//-----------------------------------Success Page -----------------------
    }
    else{
        res.status(200).render('home.ejs');//---------------------------------fail page------------------------------
    }}
    else{
        console.log("First SignUp Then come to login");

    }
});
});
const Usert = mongoose.model('teacher', {
    name: String,
    email: String,
     pass: String
});
app.get("/loginTeacher",function(req,res){
	res.status(200).render('loginTeacher.ejs');
});
app.post("/loginTeacher",function(req,res){
	var name= req.body.name;
	  const email= req.body.email;
	  const pass= req.body.pass;
	  const data = email;

	 

   Usert.findOne({'email' : new RegExp(data, 'i')}, function(err, docs){
  if(docs)       
 {
   if(docs.pass==pass)
  {
	  res.status(200).render('Acct.ejs');//-----------------------------------Success Page -----------------------
  }
  else{
	  res.status(200).render('home.ejs');//---------------------------------fail page------------------------------
  }}
  else{
	  console.log("First SignUp Then come to login for Teachers");

  }
});
});

// Server setup
app.listen(port, () => {
	console.log("server is running");
});
