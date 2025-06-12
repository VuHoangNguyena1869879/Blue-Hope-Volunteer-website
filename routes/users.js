var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user_info', (req, res) => {
  if (req.session.user && req.session.user.fullname) {
    res.json({ name: req.session.user.fullname });
  } else {
    res.status(401).send('User not authenticated');
  }
});

module.exports = router;
