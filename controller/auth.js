const mysql= require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const db= mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});


exports.register= (req , res) => {
     console.log(req.body);

const{username ,email ,password} = req.body;
 
db.query('SELECT email FROM users WHERE email = ?' , [email], async (error,results) =>{
    if(error){
         console.log(error);
    }

    if(results.length > 0){
        return res.render('index', {
            message:'That email is already in use'
        });
       
    } 

let hashedPassword = await bcrypt.hash(password , 8);
console.log(hashedPassword);


  db.query('INSERT INTO users SET ?', {name: username , email: email , password : hashedPassword} , (error , result) =>{
    if(error){
        console.log(error);
  } else {
    console.log(results);
    return res.render('index', {
        message:'That email is already in use'
    }
  )}
  })




});


    // res.send("Form Submitted");
}