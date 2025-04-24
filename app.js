const express  = require('express');
const session =require('express-session');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
const bcrypt=require('bcrypt');
const { name } = require('ejs');

const app=express();
//Mysql 
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs_login'
})
db.connect((err)=>{
    if (err){
        throw err;
    }console.log("Mysql connected")
})
//Setup middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret:'nodesecret',
    resave:false,
    saveUninitialized:true
}))

//set EJS as tamplate engine
app.set('view engine','ejs')

//Route
app.get('/',(rep,res)=>{
    res.render('index');
})
//Get Route
app.get('/login',(rep,res)=>{
    res.render('login');
})

app.get('/register',(rep,res)=>{
    res.render('register');
})
//Post Route
app.post('/register',(req,res)=>{
    const {name,email,password}=req.body;

    const checkEmailQuery='SELECT * from user WHERE email=?';
    db.query(checkEmailQuery,[email],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            //check email already register
            res.render('register',{error_msg:"Email already registered.please use a different email."})
        }else{
            const hashedPassword=bcrypt.hashSync(password,10);
            const insertUserQuery='INSERT INTO user(name,email,password) VALUES(?,?,?)';
            db.query(insertUserQuery,[name,email,hashedPassword],(err,result)=>{
                if (err) throw err;
                res.render('register',{success_msg:'Registation Successfully.'})
            });
        }
    })
})
app.listen(3000,()=>{
    console.log('server is running...');
})