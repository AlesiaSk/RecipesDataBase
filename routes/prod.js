const fs = require('fs');

module.exports = {
    addProdPage: (req, res) => {
        res.render('add-prod.ejs', {
            title: "Welcome to Recipe book | Add a new product"
            ,message: ''
        });
    },
    addProd: (req, res) => {
        let message = '';
        let name = req.body.name;
        let ingridients = req.body.ingridients;
        let recipe = req.body.recipe;

        let nameQuery = "SELECT * FROM `product` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('add-prod.ejs', {
                    message,
                    title: "Welcome to Recipe book | Add a new product"
                });
            } else {
                // check the filetype before uploading it
                
                        // send the player's details to the database
                        let query = "INSERT INTO `product` ( name, ingridients, recipe) VALUES ( '" + name + "', '" + ingridients + "', '" + recipe + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                   
               
            }
        });
    },
    editProdPage: (req, res) => {
        let prodId = req.params.id;
        let query = "SELECT * FROM `product` WHERE id = '" + prodId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-prod.ejs', {
                title: "Edit  Product"
                ,product: result[0]
                ,message: ''
            });
        });
    },
    editProd: (req, res) => {
        
        let prodId = req.params.id;
        let name = req.body.name;
        let ingridients = req.body.ingridients;
        let recipe = req.body.recipe;

        let query = "UPDATE `product` SET `name` = '" + name + "',  `ingridients` = '" + ingridients + "',  `recipe` = '" + recipe + "' WHERE `product`.`id` = '" + prodId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteProd: (req, res) => {
        let prodId = req.params.id;
        let deleteRecQuery = 'DELETE FROM product WHERE id = "' + prodId + '"';

        db.query(deleteRecQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
