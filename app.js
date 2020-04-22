const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const monk = require('monk');

//connect to database
const dbUrl = ('localhost:27017/sample_saasdb' || process.env.MONGO_URL);
const db = monk(dbUrl);

db.then(() => {
    console.log('connected to db');
});

const users = db.get('users');

/*
users.find({})
    .then((docs) =>{
    console.log(docs);
});
*/

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Setting static files
app.use(express.static('public'));

//Parse requests to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/main', (req, res) => {
    res.render('main');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', function (req, res) {
    let email = req.body.email.toString();
    let password = req.body.password.toString();
    console.log({email,password});
    users.find({ 'email': email, 'password': password }, function(err, docs) {
        if(err) {
            console.log(err);
        }
        if (docs.length == 0) {
            console.log('sending json');
            res.json({
                message: "NA"
            });
        } else {
            res.json({
                message: "Redirect"
            });
        }   
    });
});

app.post('/signup', (req, res, next) => {
    let email = req.body.email.toString();
    let password = req.body.password.toString();
    console.log({email,password});
    users.find({'email': email})
        .then((docs) => {
            console.log(docs);
            if (docs.length >= 1) {
                console.log('already exists');
                res.json({
                    message: "Exists"
                });
            } else {
                users
                    .insert({
                        'email': email,
                        'password': password 
                    })
                    .then((newUser) => {
                        console.log(newUser);
                    });
                res.json({
                    message: "Redirect"
                    //message: "Redirect"
                });
            }   
        });
});

//error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

