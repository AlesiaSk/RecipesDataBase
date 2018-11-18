const fs = require('fs');

module.exports = {
    addRecPage: (req, res) => {
        res.render('add-rec.ejs', {
            title: "Welcome to Recipe book | Add a new recipe"
            ,message: ''
        });
    },
    addRec: (req, res) => {
        let message = '';
        let number = req.body.number;
        let name = req.body.name;
        let description = req.body.description;
        let author = req.body.author;
        let ingridients = req.body.ingridients;
        let kkal = req.body.kkal;
        let gramm = req.body.gramm;

        let nameQuery = "SELECT * FROM `recipe` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('add-rec.ejs', {
                    message,
                    title: "Welcome to Recipe book | Add a new recipe"
                });
            } else {
                // check the filetype before uploading it
                
                        // send the player's details to the database
                        let query = "INSERT INTO `recipe` (number, name, description, author, ingridients, kkal, gramm) VALUES ('" +
                        number + "', '" + name + "', '" + description + "', '" + author + "', '" + ingridients + "', '" + kkal + "', '" + gramm + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                   
               
            }
        });
    },
    editRecPage: (req, res) => {
        let recId = req.params.id;
        let query = "SELECT * FROM `recipe` WHERE id = '" + recId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-rec.ejs', {
                title: "Edit  Recipe"
                ,recipe: result[0]
                ,message: ''
            });
        });
    },
    editRec: (req, res) => {
        
        let recId = req.params.id;
        let number = req.body.number;
        let name = req.body.name;
        let description = req.body.description;
        let author = req.body.author;
        let ingridients = req.body.ingridients;
        let kkal = req.body.kkal;
        let gramm = req.body.gramm;

        let query = "UPDATE `recipe` SET `number` = '" + number + "', `name` = '" + name + "', `description` = '" + description + "', `author` = '" + author + "', `ingridients` = '" + ingridients + "', `kkal` = '" + kkal + "', `gramm` = '" + gramm + "' WHERE `recipe`.`id` = '" + recId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteRec: (req, res) => {
        let recId = req.params.id;
        let deleteRecQuery = 'DELETE FROM recipe WHERE id = "' + recId + '"';

        db.query(deleteRecQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
