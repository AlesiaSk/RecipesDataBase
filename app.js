const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage, getProductPage} = require('./routes/index');
const {addRecPage, addRec, deleteRec, editRec, editRecPage} = require('./routes/rec');
const {addProdPage, addProd, deleteProd, editProd, editProdPage} = require('./routes/prod');
const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'alesya',
    database: 'products'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addRecPage);
app.get('/edit/:id', editRecPage);
app.get('/delete/:id', deleteRec);
app.post('/add', addRec);
app.post('/edit/:id', editRec);
app.get('/products', getProductPage);
app.get('/addProduct', addProdPage);
app.get('/editProduct/:id', editProdPage);
app.get('/deleteProduct/:id', deleteProd);
app.post('/addProduct', addProd);
app.post('/editProduct/:id', editProd);
/*app.get('/delivers', getDeliverPage);
app.get('/addDeliver', addDeliverPage);
app.get('/editDeliver/:id', editDeliverPage);
app.get('/deleteDeliver/:id', deleteDeliver);
app.post('/addDeliver', addDeliver);
app.post('/editDeliver/:id', editDeliver);
*/
// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});