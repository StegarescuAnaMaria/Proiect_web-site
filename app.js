var express=require('express');
var path=require("path");
var app=express();
var bodyParser=require("body-parser");
var fs=require("fs");
var crypto=require('crypto');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use("/css",express.static(path.join(__dirname, 'css')));

app.use("/video",express.static(path.join(__dirname, 'video')));
app.use("/imagini",express.static(path.join(__dirname, 'imagini')));
app.use("/audio",express.static(path.join(__dirname, 'audio')));
app.use("/fonts",express.static(path.join(__dirname, 'fonts')));
app.use("/js",express.static(path.join(__dirname, 'js')));
//console.log("salut");

app.use(bodyParser.urlencoded({extended:true}));


app.use(session({
	secret:'architect',
	resave: true,
	saveUninitialized: false
}));

//app.post('/logged', function(req, res)
//{
//	res.send('Logged in');
//});

app.get('/login', function(req, res)
{
	res.render('form_login');
});

app.post('/log_in', function(req, res)
{
	res.redirect('/login');
});

app.post('/sign_up', function(req, res)
{
	res.redirect('/signup');
});

app.post('/logged', function(req, res)
{
	let users=fs.readFileSync('users.JSON');
	
	let usersObj=JSON.parse(users);
	var found=false;
	
	for(let i=0; i<usersObj.users.length; i++)
	{
		if((usersObj.users[i]["name"]==req.body.username)||(usersObj.users[i]["mail"]==req.body.username))
		{
			var password=Crypt_pass(req.body.pass);
			if(password!=usersObj.users[i]["password"])
				res.render('form_login.ejs', {pass:'wrong'});
			else
			{
				found=true;
			req.session.username=usersObj.users[i]["name"];
			res.render('index', {username: req.session.username});
			}
		}
	}
	if(found==false)res.render('form_login.ejs', {pass:'wrong'});
});

function decrypt(pass)
{
	var decipher=crypto.createDecipher('aes128', 'astronauts');
	var decrypted=decipher.update(pass, 'hex', 'utf8');
	decrypted+=decipher.final("utf8");
	return decrypted;
}
/*
app.get('/imagefilter', function(req, res)
{
	var Images=fs.readFileSync("images.JSON");
	var imageObj=JSON.parse(Images);
	var ul=document.createElement("ul");
	for(let i=0; i<imageObj.images.length; i++)
	{
		if(req.body.color && imageObj.images[i]["color"]=="yes" && req.body.width<=imageObj.images[i]["width"] && req.body.height<=imageObj.images[i]["height"])
		{
			
			
		}
	}
	
});
*/
app.post('/logout', function(req, res)
{
	req.session.destroy();
	res.redirect('/');
});

app.get('/', function(req, res)
{
	res.render('index.ejs', {username: req.session.username});
});

app.get('/transmissionsLyrics', function(req, res)
{
	res.render('transmissions_lyrics', {username: req.session.username});
});

app.get('/signup', function(req, res)
{
	res.render('signup_form');
});

app.get('/transmissionsGallery', function(req, res)
{
	res.render('transmissions_images', {username: req.session.username});
});

app.post('/createaccount', function(req, res)
{
	let users=fs.readFileSync('users.JSON');
	
	let usersObj=JSON.parse(users);
	
	if(findUser(req.body.username, usersObj.users))
	{
		res.render('signup_form.ejs', {message:"Username taken"});
	}
	else 
	if(findByMail(req.body.email, usersObj.users))
	{
		res.render('signup_form.ejs', {email:"taken"});
	}
	else
	if(req.body.pass!=req.body.pass2)
	{
		res.render('signup_form.ejs', {match:'dont match'});
	}
	else
	if(PassShort(req.body.pass))
	{
		res.render('signup_form.ejs', {pass: 'short'});
	}
	else
	{ 
let crypt_pass=Crypt_pass(req.body.pass);
let name=JSON.stringify(req.body.username);
let mail=JSON.stringify(req.body.email);

var myObj={"name": req.body.username, "password": crypt_pass, "mail": req.body.email};
usersObj.users.push(myObj);
let obj=JSON.stringify(usersObj);
fs.writeFileSync('users.JSON', obj);
res.render('signup_form.ejs', {created: 'accountcreated'})
	}
});

function Crypt_pass(pass)
{
	var cipher=crypto.createCipher('aes128', 'astronauts');
	let password=JSON.stringify(pass);
	var encrypted=cipher.update(password, 'utf8', 'hex');
	encrypted+=cipher.final('hex');
	return encrypted;
}

function PassShort(pass)
{
	let str=JSON.stringify(pass);
	if(str.length<6)
		return true;
}

function findUser(user, users)
{
	for(let i=0; i<users.length; i++)
	{
		if(user==users[i].name)
			return true;
	}
	return false;
}

function findByMail(mail, users)
{
	for(let i=0; i<users.length; i++)
	{
		if(mail==users[i].mail)
			return true;
	}
	return false;
}

app.use(function(req,res){
    res.status(404).render('404');
});

app.listen(3939, function() {console.log("Listening on port 3939");});
