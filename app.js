const express  = require('express');
const session =require('express-session');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const path=require('path');
const bcrypt=require('bcrypt');

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