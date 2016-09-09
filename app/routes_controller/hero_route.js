var express    = require('express'); 
var router     = express.Router();

var Hero       = require('../models/hero');  

// on routes that end in /heroes
// ----------------------------------------------------
router.route('/heroes')

    // create a hero (accessed at POST http://localhost:8080/api/hero/heroes)
    .post(function(req, res) {
        
        var hero = new Hero();      // create a new instance of the Hero model
        hero.name = req.body.name;  // set the heroes name (comes from the request)
		//console.log("req.body back " + req.body);
		//console.log("req.body.name back " + req.body.name);
        // save the hero and check for errors
        hero.save(function(err) {
            if (err)
                res.send(err);
            res.json(hero);
        });
        
    })
	 // get all the heroes (accessed at GET http://localhost:8080/api/hero/heroes)
    .get(function(req, res) {
        Hero.find(function(err, heroes) {
            if (err)
                res.send(err); 
            res.json(heroes);
        });
    });
	
// on routes that end in /heroes/:hero_id
// ----------------------------------------------------
router.route('/heroes/:hero_id')

    // get the hero with that id (accessed at GET http://localhost:8080/api/hero/heroes/:hero_id)
    .get(function(req, res) {
        Hero.findById(req.params.hero_id, function(err, hero) {
            if (err)
                res.send(err);
            res.json(hero);
        });
    })
	 // update the hero with this id (accessed at PUT http://localhost:8080/api/hero/heroes/:hero_id)
    .put(function(req, res) {

        // use our hero model to find the hero we want
        Hero.findById(req.params.hero_id, function(err, hero) {

            if (err)
                res.send(err);

            hero.name = req.body.name;  // update the heroes info

            // save the hero
            hero.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Hero updated!' });
            });

        });
    })
	// delete the hero with this id (accessed at DELETE http://localhost:8080/api/hero/heroes/:hero_id)
    .delete(function(req, res) {
		console.log("req.params.hero_id " + req.params.hero_id)
        Hero.remove({
            _id: req.params.hero_id
        }, function(err, hero) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	// on routes that end in /heroes
// ----------------------------------------------------
router.route('/heroesSearch/:hero_name')
   
	 // get all the heroes (accessed at GET http://localhost:8080/api/hero/heroesSearch/:hero_name)
    .get(function(req, res) {
		console.log("req.params.hero_name " + req.params.hero_name)
		console.log("req.params.hero_name 2" + '/' + req.params.hero_name + '/i')
        Hero.find({
			name: new RegExp(req.params.hero_name, 'i')
		}, function(err, heroes) {
            if (err)
                res.send(err);
            res.json(heroes);
        });
    });
	
module.exports = router