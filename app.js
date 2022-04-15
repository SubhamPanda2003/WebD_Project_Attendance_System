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





app.get('/student_Register', (req, res)=>{
    
    res.status(200).render('student_Register.ejs');
})
app.get('/Home', (req, res)=>{
    
    res.status(200).render('Home.ejs');
})
app.get('/Privacy', (req, res)=>{
    
    res.status(200).render('privacy.ejs');
})


app.get('/login', (req, res)=>{
    
    res.status(200).render('student_login.ejs');
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
app.post("/student_Register", function (req, res) {
	if(req.body.pass==req.body.cpass){
	const feedData = new feedModal({
		name: req.body.name,
		email: req.body.email,
		pass: req.body.pass

	});
	feedData.save()
		.then(data => {
			res.render('student_Register.ejs',
        { msg: "Your feedback successfully saved." });
		})
		.catch(err => {
			res.render('student_Register.ejs',
				{ msg: "Check Details." });
		});
	}
	else
	res.render('Home.ejs');
})


app.get('/formTeacher', (req, res)=>{
    
    res.status(200).render('teacher_Register.ejs');
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
	res.status(200).render('teacher_login.ejs');
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
//----------------------------------------------------deleting a student from a database ---------------------------
app.route("/studentsDelete/:emailTitle")
.get(function(req, res){

	User.deleteOne(
	  {email: req.params.emailTitle},
	  function(err){
		if (!err){
		  res.send("Successfully deleted the corresponding article.");
		} else {
		  res.send(err);
		}
	  }
	);
  });
//---------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------deleting a teacher from database--------------------------------
app.route("/teacherDelete/:emailTitle")
.get(function(req, res){

	Usert.deleteOne(
	  {email: req.params.emailTitle},
	  function(err){
		if (!err){
		  res.send("Successfully deleted the corresponding article.");
		} else {
		  res.send(err);
		}
	  }
	);
  });
// Server setup
app.listen(port, () => {
	console.log("server is running");
});
