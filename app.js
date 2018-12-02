const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage, getProductPage, getDeliverPage, showMinkkalPage, showProdForRec} = require('./routes/index');
const {addRecPage, addRec, deleteRec, editRec, editRecPage} = require('./routes/rec');
const {addProdPage, addProd, deleteProd, editProd, editProdPage} = require('./routes/prod');
const {addDeliverPage, addDeliver, deleteDeliver, editDeliver, editDeliverPage} = require('./routes/deliv');
const {findDeliver, priceListPage} = require('./routes/price');
const port = 2000;

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'alesya',
    database: 'products'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.set('port', process.env.port || port); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(fileUpload()); 

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
app.get('/delivers', getDeliverPage);
app.get('/addDeliver', addDeliverPage);
app.get('/editDeliver/:id', editDeliverPage);
app.get('/deleteDeliver/:id', deleteDeliver);
app.post('/addDeliver', addDeliver);
app.post('/editDeliver/:id', editDeliver);
app.get('/showMinkkalPage', showMinkkalPage);
app.get('/showRecipeForProduct', showProdForRec);
app.get('/findProvider', priceListPage);
app.post('/findProvider', findDeliver);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});