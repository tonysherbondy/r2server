// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// database setup
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/r2db');
var Judge = require('./app/models/judge');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.use(function(req, res, next) {
  console.log('Something happened');
  next();
});

router.route('/judges/:judge_id')

  .delete(function (req, res) {
    Judge.remove(
      {'_id': req.params.judge_id},
      function (err, judge) {
        if (err) {
          res.send(err);
        }
        res.json({message: "Judge deleted!"});
      }
    );
  })

  .get(function (req, res) {
    Judge.findById(req.params.judge_id, function (err, judge) {
      if (err) {
        res.send(err);
      }
      res.json(judge);
    });
  })

  .put(function (req, res) {
    Judge.findById(req.params.judge_id, function (err, judge) {
      if (err) {
        res.send(err);
      }

      judge.name = req.body.name;
      judge.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({message: "Judge updated!" });
      });
    });
  });

router.route('/judges')

  // Get all judges
  .get(function (req, res) {
    Judge.find(function (err, judges) {
      if (err) {
        res.send(err);
      }
      res.json(judges);
    });
  })

  // Create judge
  .post(function (req, res) {
    var judge = new Judge();
    judge.name = req.body.name;
    judge.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({message: "Judge created!" });
    });
  });

// test route to make sure everything is working
// (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
