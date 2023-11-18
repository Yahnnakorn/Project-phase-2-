var express = require('express')
var cors = require('cors')
var app = express()
const port = 2023;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
app.use(cors())
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const saltRounds = 10
var jwt = require('jsonwebtoken')
const secret = 'WeGameShop'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
  });
// ลงทะเบียนนำข้อมูลเข้า MySQL
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO user (fname, lname, email, password) VALUES(?, ?, ?, ?)',
            [req.body.fname, req.body.lname, req.body.email, hash],
            function(err, results, fields) {
             if (err) {   
              res.json({status: 'error', message: err})
              return
            }
            res.json({status: 'ok'})
          }
       );
    });
}) 
// ตรวจสอบอีเมลและรหัสผ่านจากฐานข้อมูล
app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
    'SELECT * FROM user WHERE email=?',
    [req.body.email],
        function(err, user, fields) {
             if (err) { res.json({status: 'error', message: err}); return }
             if (user.length == 0) { res.json({status: 'error', message: 'no user found'}); return }
             bcrypt.compare(req.body.password, user[0].password, function(err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({email: user[0].email}, secret, {expiresIn: '4h'});
                    res.json({status: 'ok', message: 'login success', token})
                } else {
                    res.json({status: 'error', message: 'login failed'})
                }              
             });
          }
     );   
})

app.post('/authen', jsonParser, function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status: 'ok', decoded})
    } catch(err) {
        res.json({status: 'error', message: err.message})
    }
    
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, secret);
    res.json({decoded})
})

app.listen(2023, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})