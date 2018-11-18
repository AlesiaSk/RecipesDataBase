const fs = require('fs');

module.exports = {
    addDeliverPage: (req, res) => {
        res.render('add-deliv.ejs', {
            title: "Welcome to Recipe book | Add a new provider"
            ,message: ''
        });
    },
    addDeliver: (req, res) => {
        let message = '';
        let num = req.body.num;
        let name = req.body.name;
        let address = req.body.address;
        let telnum = req.body.telnum;

        let nameQuery = "SELECT * FROM `provider` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('add-deliv.ejs', {
                    message,
                    title: "Welcome to Recipe book | Add a new provider"
                });
            } else {
                        let query = "INSERT INTO `provider` (num, name, address, telnum) VALUES ('" +
                        num + "', '" + name + "', '" + address + "', '" + telnum + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                   
               
            }
        });
    },
    editDeliverPage: (req, res) => {
        let delivId = req.params.id;
        let query = "SELECT * FROM `provider` WHERE id = '" + delivId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-deliv.ejs', {
                title: "Edit  Provider"
                ,provider: result[0]
                ,message: ''
            });
        });
    },
    editDeliver: (req, res) => {
        
        let recId = req.params.id;
        let num = req.body.num;
        let name = req.body.name;
        let address = req.body.address;
        let telnum = req.body.telnum;

        let query = "UPDATE `provider` SET `num` = '" + num + "', `name` = '" + name + "', `address` = '" + address + "', `telnum` = '" + telnum + "' WHERE `provider`.`id` = '" + recId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteDeliver: (req, res) => {
        let recId = req.params.id;
        let deleteRecQuery = 'DELETE FROM provider WHERE id = "' + recId + '"';

        db.query(deleteRecQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
