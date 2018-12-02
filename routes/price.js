const fs = require('fs');

module.exports = {




    priceListPage: (req, res) => {
        res.render('findDeliver.ejs', {
            title: "Welcome to Recipe book | Add a new product"
            , message: ''
        });
    },
    /*findDeliver: (req, res) => {
        let message = '';
        let dateDel = req.body.dateDel;
        let name = req.body.name;

        let nameQuery = "SELECT address FROM `provider` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                let nameQuery = "SELECT * FROM `price_list` WHERE num = '" + dateDel + "'";
                db.query(nameQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result.length > 0) {
                        res.render('index-find.ejs', {
                            message,
                            title: "Welcome to Recipe book | Add a new product"
                        });
                    } else {
                        message = 'Not found';
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });


                    }
                });
            } else {
                message = 'Not found';
                res.render('add-deliv.ejs', {
                    message,
                    title: "Welcome to Recipe book | Add a new product"
                });
            }
        
        });


    }
*/

/*  findDeliver: (req, res) => {

        let name = req.body.prname;
        let nameQuery = "SELECT * FROM `price_list` WHERE name = '" + name + "'";
        db.query(nameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('findDeliver.ejs', {
                    message,
                    title: "Welcome to Recipe book | Add a new product"
                });
            } else {
                 db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });


            }
        });

    } */

    findDeliver: (req, res) => {
        let name = req.body.prname;
        let num = req.body.dateDel;
        let query  = "SELECT * FROM `price_list` WHERE provider = '" + name + "' AND num = '" + num + "'";

        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index-find.ejs', {
                title: "Providers"
                ,price_list: result
            });
        });
}


}


   /*     let message = '';
        let name = req.body.prname;
        let nameQuery = "SELECT * FROM `price_list` WHERE name = '" + name + "'";

        db.query(nameQuery, (err, result) => {
            if (err) {
                message = 'Name already exists';
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Name already exists';
                res.render('index-find.ejs', {
                    message,
                    title: "Welcome to Recipe book | Add a new product"
                });
            } else {
                

            }
        });
    } */

    