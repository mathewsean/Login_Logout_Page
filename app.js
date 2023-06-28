const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
let alert = require('alert');

const app = express();
const PORT = 4250;

const oneDay = 1000 * 60 * 60 * 24;


app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true
}));  


app.use(function(req, res, next) { 
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   next();
 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use(cookieParser());

const myusername = 'Super'
const mypassword = '12345'

var session; 

app.get('/',(req,res) => {
  session=req.session;
  if(session.userid){
      res.sendFile('views/user.html',{root:__dirname});
  }else
  res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
  if(req.body.username == myusername && req.body.password == mypassword){
      session=req.session;  
      session.userid=req.body.username;
      console.log(req.session)
      res.sendFile('views/user.html',{root:__dirname});
  }
  else{
    alert("Please check User ID and Password")
  }
})

app.get('/user',(req,res) => {  
  req.session.destroy(); 
  res.redirect('/');
});


app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));       