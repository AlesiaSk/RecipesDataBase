module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `recipe` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Recipes"
                ,recipe: result
            });
        });
    },

    getProductPage: (req, res) => {
        let query = "SELECT * FROM `product` ORDER BY id ASC"; 
    
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index-prod.ejs', {
                title: "Products"
                ,product: result
            });
        });
    },

    getDeliverPage: (req, res) => {
        let query = "SELECT * FROM `provider` ORDER BY id ASC"; 
    
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index-deliv.ejs', {
                title: "Providers"
                ,provider: result
            });
        });
    },

    showMinkkalPage: (req, res) => {

        let query = "SELECT * FROM recipe WHERE kkal =  ( SELECT MIN(kkal) FROM recipe )"; 
    
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('show-rec.ejs', {
                title: "Providers"
                ,recipe: result
            });
        });
    },

    showProdForRec: (req, res) => {
        let query = "SELECT * FROM `product` ORDER BY id ASC"; 
    
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('showProdRec.ejs', {
                title: "Products"
                ,product: result
            });
        });
    },
};

