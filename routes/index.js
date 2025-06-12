var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const argon2 = require('argon2');
const path = require('path');
const passport = require('passport');
const fs = require('fs');
const multer = require("multer");
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { send } = require('process');

// For parsing multipart/form
const upload = multer({
  dest: './public/images'
});

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bluehope.nonprofit@gmail.com',
    pass: 'bbrf qqcj fuve zzji'
  }
});
// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Middleware to init cookies
router.get('/:any', function (req, res, next) {
  if (!req.cookies.selectedCity) {
    res.cookie('selectedCity', 'All', { maxAge: 24 * 60 * 60 * 1000 });
  }
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.resolve('public', 'index.html'));
});

router.get('/index', function (req, res, next) {
  res.sendFile(path.resolve('public', 'index.html'));
});
router.get('/login', (req, res) => {
  res.sendFile(path.resolve('public', 'login.html'));
});
router.get('/signup', (req, res) => {
  res.sendFile(path.resolve('public', 'signup.html'));
});
router.get('/events', function (req, res, next) {
  res.sendFile(path.resolve('public', 'events.html'));
});
router.get('/eventPost', function (req, res, next) {
  res.sendFile(path.resolve('public', 'eventPost.html'));
});
router.get('/aboutUs', function (req, res, next) {
  res.sendFile(path.resolve('public', 'aboutUs.html'));
});
router.get('/news', function (req, res, next) {
  res.sendFile(path.resolve('public', 'news.html'));
});
router.get('/newsPost', function (req, res, next) {
  res.sendFile(path.resolve('public', 'newsPost.html'));
});
router.get('/garageSaleEvent', function (req, res, next) {
  res.sendFile(path.resolve('public', 'garageSaleEvent.html'));
});
router.get('/donate', function (req, res, next) {
  res.sendFile(path.resolve('public', 'donate.html'));
});
router.get('/aboutUs', function (req, res, next) {
  res.sendFile(path.resolve('public', 'aboutUs.html'));
});
router.get('/contact', function (req, res, next) {
  res.sendFile(path.resolve('public', 'contact.html'));
});
router.get('/searchResults', function (req, res, next) {
  res.sendFile(path.resolve('public', 'searchResults.html'));
});
router.get('/searchUsers', function (req, res, next) {
  res.sendFile(path.resolve('public', 'searchUsers.html'));
});
router.get('/userInformation', function (req, res, next) {
  res.sendFile(path.resolve('public', 'user_information.html'));
});
router.get('/myEvents', function (req, res, next) {
  res.sendFile(path.resolve('public', 'my_events.html'));
});
router.get('/settings', function (req, res, next) {
  res.sendFile(path.resolve('public', 'settings.html'));
});
router.get('/change', function (req, res, next) {
  res.sendFile(path.resolve('public', 'change.html'));
});
// router.get('/addUser', function (req, res, next) {
//   res.sendFile(path.resolve('public', 'add_user.html'));
// });
router.get('/manageUser', function (req, res, next) {
  res.sendFile(path.resolve('public', 'manage_user.html'));
});
router.get('/manageBranches', function (req, res, next) {
  res.sendFile(path.resolve('public', 'manage_branches.html'));
});
router.get('/editUser', function (req, res, next) {
  res.sendFile(path.resolve('public', 'edit_user.html'));
});

router.get('/branchManager', function (req, res, next) {
  res.sendFile(path.resolve('public', 'branchManager.html'));
});

router.post('/rmEvent', function (req, res) {
  const event_id = req.body.id;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = "DELETE FROM events WHERE event_id=?";
    connection.query(query, [event_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      res.sendStatus(200);
    });
  });
});

router.post('/markDone', function (req, res) {
  const event_id = req.body.id;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = "UPDATE events SET event_done=1 WHERE event_id=?";
    connection.query(query, [event_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      res.sendStatus(200);
    });
  });
});

router.get('/checkRSVP', function (req, res) {
  const event_id = req.query.idx;
  const user_id = req.cookies.userId;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = "SELECT rsvp_id FROM rsvp WHERE user_id=? AND event_id=?";
    connection.query(query, [user_id, event_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      if (results.length > 0) {
        res.send('joined');
        return;
      }

      res.send('unjoined');
    });
  });
});

router.get('/getBranches', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = "SELECT * FROM branches";
    connection.query(query, function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      res.send(results);
    });
  });
});

router.post('/postEvent', upload.single('img'), function (req, res, next) {
  if (!req.file) {
    res.status(500).send('Please add an image');
    return;
  }

  if (!req.body.title) {
    res.status(500).send('Please add a title');
    return;
  }

  if (!req.body.description) {
    res.status(500).send('Please add a description');
    return;
  }

  if (!req.body.date) {
    res.status(500).send('Please add a date');
    return;
  }

  if (!req.body.start_time) {
    res.status(500).send('Please add a start time');
    return;
  }

  if (!req.body.end_time) {
    res.status(500).send('Please add a end time');
    return;
  }

  if (!req.body.location) {
    res.status(500).send('Please add a location');
    return;
  }

  if (!req.body.type) {
    res.status(500).send('Please add a type');
    return;
  }

  next();
});

router.post('/postEvent', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    var title = req.body.title;
    var description = req.body.description;
    var activities = req.body.activities;
    var prerequisite = req.body.prerequisite;
    var date = req.body.date;
    var time = req.body.start_time + " - " + req.body.end_time;
    var location = req.body.location;
    var type = req.body.type;
    var status = req.body.status === 'done' ? 1 : 0;
    var impath = 'images/' + req.file.filename;
    var branch = req.body.branch;
    const query = `INSERT INTO events (
    event_name,
    event_description,
    event_activities,
    event_prerequisite,
    event_date,
    event_time,
    event_location,
    event_type,
    event_done,
    event_im_path,
    branch_id
    ) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, branch_id
    FROM branches
    WHERE branch_name = ?`;
    connection.query(query, [title, description, activities, prerequisite, date, time, location, type, status, impath, branch], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      const subscriber_query = `SELECT * FROM subscribers`;
      connection.query(subscriber_query, function (err, results) {
        if (err) {
          console.error('Query error:', err);
          res.status(500).send('Query error');
          return;
        }

        for (let i = 0; i < results.length; i++) {
          if (results[i].city === branch) {
            sendMail(results[i]);
          }
        }
      });

      res.redirect('/eventPage.html?idx=' + results.insertId);
    });
  });
});

router.post('/postNews', upload.single('img'), function (req, res, next) {
  if (!req.file) {
    res.status(500).send('Please add an image');
    return;
  }

  if (!req.body.title) {
    res.status(500).send('Please add a title');
    return;
  }

  if (!req.body.body) {
    res.status(500).send('Please add a description');
    return;
  }

  next();
});

router.post('/postNews', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    var title = req.body.title;
    var body = req.body.body;
    var branch = req.body.branch;
    var impath = 'images/' + req.file.filename;
    var is_private = (req.body.is_private === "private" ? 1 : 0);
    const query = `INSERT INTO news (news_title, news_body, branch_id, news_im_path, is_private)
    SELECT ?, ?, branch_id, ?, ?
    FROM branches
    WHERE branch_name = ?`;
    connection.query(query, [title, body, impath, is_private, branch], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      var subscriber_query = `SELECT * FROM subscribers`;
      if (is_private) {
        subscriber_query += ` INNER JOIN users ON subscribers.email = users.email`
      }
      connection.query(subscriber_query, function (err, results) {
        if (err) {
          console.error('Query error:', err);
          res.status(500).send('Query error');
          return;
        }

        for (let i = 0; i < results.length; i++) {
          if (results[i].city === branch) {
            sendMail(results[i]);
          }
        }
      });

      res.redirect('/newsPage.html?idx=' + results.insertId);
    });
  });
});

router.get('/newsPage', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    var id = req.query.idx;
    const query = `SELECT * FROM news WHERE news_id = ?`;
    connection.query(query, [id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      res.send(results);
    });
  });
});

router.get('/newsContent', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    var current_branches = req.cookies.selectedCity;
    var see_private = (req.cookies.isAuthorised === 'true' ? true : false);

    var query = `SELECT * FROM news`;

    if (current_branches !== "All") {
      query += ` INNER JOIN branches ON news.branch_id = branches.branch_id`;
    }

    if (current_branches !== "All" && !see_private) {
      query += ' WHERE branch_name=? AND is_private=0';
    } else if (current_branches !== "All") {
      query += ' WHERE branch_name=?';
    } else {
      query += ' WHERE is_private=0';
    }

    query += ` ORDER BY posted_on DESC`

    connection.query(query, [current_branches], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      res.send(results);
    });
  });
});

router.get('/eventPage', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }
    var id = req.query.idx;

    const query = `SELECT * FROM events WHERE event_id =? `;
    connection.query(query, [id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      res.send(results);
    });
  });
});

router.get('/eventContent', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    var current_branches = req.cookies.selectedCity;
    var query = `SELECT * FROM events
      INNER JOIN branches ON events.branch_id = branches.branch_id
      WHERE branch_name =?
      ORDER BY posted_on DESC; `;

    if (current_branches === "All") {
      query = `SELECT * FROM events
      ORDER BY posted_on DESC; `;
    }

    connection.query(query, [current_branches], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      res.send(results);
    });
  });
});

router.post('/joinEvent', function (req, res) {
  if (!req.cookies.username) {
    return res.status(401).json({ message: 'You must log in to join the event' });
  }

  const event_id = req.body.event_id;
  const user_id = req.cookies.userId;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).json({ message: 'Database connection error' });
    }


    // If the user hasn't joined the event, insert the RSVP record
    const insertQuery = `INSERT INTO rsvp(event_id, user_id) VALUES(?, ?)`;
    connection.query(insertQuery, [event_id, user_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ message: 'Query error' });
      }
      res.status(200).json({ message: 'Join event successfully!' });
    });
  });
});


router.get('/eventsRSVP', function (req, res) {
  const eventId = req.query.idx;

  if (!eventId) {
    return res.status(400).send('Event ID is required');
  }

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).send('Database connection error');
    }

    const query = `
          SELECT users.full_name, users.email, users.phone
          FROM rsvp
          JOIN users ON rsvp.user_id = users.user_id
          WHERE rsvp.event_id = ?;
    `;

    connection.query(query, [eventId], (err, results) => {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        return res.status(500).send('Server error');
      }

      res.json(results);
    });
  });
});

router.post('/myEvents', function (req, res) {
  const user_id = req.query.idx;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = `
          SELECT events.event_name
          FROM rsvp
          JOIN events ON rsvp.event_id = events.event_id
          WHERE rsvp.user_id = ?;
      `;

    connection.query(query, [user_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      res.json(results);
    });
  });
});

router.post('/unjoinEvent', function (req, res) {
  const event_id = req.body.event_id;
  const user_id = req.cookies.userId;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = `DELETE FROM rsvp WHERE event_id =? AND user_id =? `;
    connection.query(query, [event_id, user_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      res.sendStatus(200);
    });
  });
});

router.get('/mainpage', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }


    var current_branches = req.cookies.selectedCity;
    var eventsQuery = `SELECT * FROM events
      INNER JOIN branches ON events.branch_id = branches.branch_id
      WHERE branch_name = ?
      ORDER BY posted_on DESC
      LIMIT 0, 4`;

    if (current_branches === "All") {
      eventsQuery = `SELECT * FROM events
      ORDER BY posted_on DESC
      LIMIT 0, 4`;
    }

    let newsQuery = `SELECT * FROM news
      INNER JOIN branches ON news.branch_id = branches.branch_id
      WHERE branch_name = ?
      ORDER BY posted_on DESC
      LIMIT 0, 3`;

    if (current_branches === "All") {
      newsQuery = `SELECT * FROM news
      ORDER BY posted_on DESC
      LIMIT 0, 3`;
    }

    connection.query(eventsQuery, [current_branches], function (err, eventResults) {
      if (err) {
        connection.release();
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }

      connection.query(newsQuery, [current_branches], function (err, newsResults) {
        connection.release();
        if (err) {
          console.error('Query error:', err);
          res.status(500).send('Query error');
          return;
        }

        res.send({
          events: eventResults,
          news: newsResults
        });
      });
    });
  });
});

router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      console.error('Validation error: Username and password are required');
      res.status(400).send('Username and password are required');
      return;
    }

    req.volunteerDBPool.getConnection(function (err, connection) {
      if (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection error');
        return;
      }

      const query = 'SELECT user_id, user_name, password, full_name, email, role FROM users WHERE user_name = ?';
      connection.query(query, [username], async function (err, results) {
        connection.release();
        if (err) {
          console.error('Query error:', err);
          res.status(500).send('Query error');
          return;
        }

        if (results.length === 0) {
          console.error('User not found:', username);
          res.status(401).send('User not found');
          return;
        }

        const user = results[0];
        try {
          if (await argon2.verify(user.password, password)) {
            req.session.user = { fullname: user.full_name, email: user.email };
            res.cookie('isAuthorised', true, { maxAge: 24 * 60 * 60 * 1000 });
            res.cookie('userRole', user.role, { maxAge: 24 * 60 * 60 * 1000 });
            res.cookie('username', user.full_name, { maxAge: 24 * 60 * 60 * 1000 });
            res.cookie('userId', user.user_id, { maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({ message: 'Login successful' });
          } else {
            console.error('Invalid password for user:', username);
            res.status(401).send('Invalid password');
          }
        } catch (err) {
          console.error('Error verifying password:', err);
          res.status(500).send('Error verifying password');
        }
      });
    });
  } catch (err) {
    console.error('Unexpected error during login:', err);
    res.status(500).send('Unexpected error during login');
  }
});

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {

    const userId = req.user.id;
    const fullName = req.user.fullName;
    const email = req.user.email;
    const role = req.user.role;

    // Set cookies with user details including userId
    res.cookie('userId', userId, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('username', fullName, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('email', email, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('userRole', role, { maxAge: 24 * 60 * 60 * 1000 });

    res.redirect('/');
  }
);

// Facebook authentication routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async (req, res) => {

    const userId = req.user.id;
    const fullName = req.user.fullName;
    const email = req.user.email && req.user.email.length > 0 ? req.user.email[0].value : 'noemail@example.com';
    const role = req.user.role;

    res.cookie('userId', userId, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('username', fullName, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('email', email, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('userRole', role, { maxAge: 24 * 60 * 60 * 1000 });

    res.redirect('/');
  }
);

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('isAuthorised');
    res.clearCookie('userRole');
    res.clearCookie('username');
    res.clearCookie('userId');
    res.redirect('/');
  });
});

router.post('/signup', [
  body('fullname').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('username').notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async function (req, res) {

  const { fullname, email, phonenumber, city, username, password } = req.body;
  const role = 'user';

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await argon2.hash(password);

    req.volunteerDBPool.getConnection(function (err, connection) {
      if (err) {
        console.error('Database connection error:', err);
        return res.status(500).send('Database connection error');
      }

      const query = 'INSERT INTO users (full_name, email, phone, city, user_name, password) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(query, [fullname, email, phonenumber, city, username, hashedPassword], function (err, results) {
        connection.release();
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.error('Query error: Username already exists');
            return res.status(409).send('Username already exists');
          } else {
            console.error('Query error:', err);
            return res.status(500).send('Query error');
          }
        }

        return res.status(201).send('User registered successfully');
      });
    });
  } catch (err) {
    console.error('Unexpected error during signup:', err);
    return res.status(500).send('Unexpected error during signup');
  }
});

router.post('/subscribe', async function (req, res) {
  const { firstname, familyname, email, city } = req.body;

  try {
    if (!firstname || !familyname || !email || !city) {
      console.error('Validation error: All fields are required');
      return res.status(400).send('All fields are required');
    }

    req.volunteerDBPool.getConnection(function (err, connection) {
      if (err) {
        console.error('Database connection error:', err);
        return res.status(500).send('Database connection error');
      }

      const query = 'INSERT INTO subscribers (first_name, family_name, email, city) VALUES (?, ?, ?, ?)';
      connection.query(query, [firstname, familyname, email, city], function (err, results) {
        connection.release();
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            console.error('Query error: Email already exists');
            return res.status(409).send('Email already exists');
          } else {
            console.error('Query error:', err);
            return res.status(500).send('Query error');
          }
        }

        // Set up email options
        const mailOptions = {
          from: 'bluehope.nonprofit@gmail.com', // Use environment variable
          to: email,
          subject: 'Subscription Confirmation',
          text: `Hello ${firstname} ${familyname},

Thank you for subscribing to the Blue Hope Volunteer Organisation newsletter!

We are thrilled to have you on board and look forward to keeping you updated with our latest news, events, and volunteer opportunities.

As a subscriber, you'll be the first to know about how you can get involved and make a difference in our community.

Best regards,
      The Blue Hope Volunteer Organisation Team`
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Subscription successful, but error sending email.');
          } else {
            return res.status(201).send('Subscription successful');
          }
        });
      });
    });
  } catch (err) {
    console.error('Unexpected error during subscription:', err);
    return res.status(500).send('Unexpected error during subscription');
  }
});

router.get('/search-events', (req, res) => {
  const query = req.query.query.toLowerCase();
  const branch = req.cookies.selectedCity;
  var sqlQuery = `
    SELECT event_id, event_name AS title, event_description AS description, event_im_path AS image
    FROM events
    INNER JOIN branches ON events.branch_id = branches.branch_id
    WHERE(LOWER(event_name) LIKE ? OR LOWER(event_description) LIKE ?) AND branch_name = ?
      ORDER BY posted_on DESC;
    `;
  var params = [`% ${query}% `, ` % ${query}% `, `${branch} `];

  if (branch === 'All') {
    sqlQuery = `
      SELECT event_id, event_name AS title, event_description AS description, event_im_path AS image
      FROM events
      WHERE LOWER(event_name) LIKE ? OR LOWER(event_description) LIKE ?
      ORDER BY posted_on DESC;
    `;
    params = [`% ${query}% `, ` % ${query}% `];
  }

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }

    connection.query(sqlQuery, params, function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Query error' });
        return;
      }
      res.json({ results });
    });
  });
});

router.get('/search-news', (req, res) => {
  const query = req.query.query.toLowerCase();
  const branch = req.cookies.selectedCity;
  var sqlQuery = `
    SELECT news_id, news_title AS title, news_body AS description, news_im_path AS image
    FROM news
    INNER JOIN branches ON news.branch_id = branches.branch_id
    WHERE(LOWER(news_title) LIKE ? OR LOWER(news_body) LIKE ?) AND branch_name = ?
      ORDER BY posted_on DESC;
    `;
  var params = [`% ${query}% `, ` % ${query}% `, `${branch} `];

  if (branch === 'All') {
    var sqlQuery = `
      SELECT news_id, news_title AS title, news_body AS description, news_im_path AS image
      FROM news
      WHERE LOWER(news_title) LIKE ? OR LOWER(news_body) LIKE ?
      ORDER BY posted_on DESC;
    `;
    var params = [`% ${query}% `, ` % ${query}% `];
  }

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }

    connection.query(sqlQuery, params, function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Query error' });
        return;
      }

      res.json({ results });
    });
  });
});

router.post('/search-email', (req, res) => {
  console.log(req.body);
  const query = req.body.query;
  const sqlQuery = `
    SELECT user_id, email, phone, role, full_name
    FROM users
    WHERE LOWER(email) LIKE ?
    `;
  const params = `%${query}%`;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }

    connection.query(sqlQuery, params, function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      }
      console.log(results);
      res.send(results);
    });
  });
});

router.post('/userInformation', function (req, res) {
  let id = req.body.id;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = 'SELECT email, user_name, full_name, role, phone FROM users WHERE user_id = ?';
    connection.query(query, [id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      }
      res.send(results);
    });
  });
});

router.post('/changeInfo', function (req, res) {
  let old_value = req.body.old;
  let new_value = req.body.new;
  let id = req.body.id;
  let type = req.body.type;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = 'UPDATE users SET ' + type + ' = ? WHERE user_id = ? AND ' + type + ' = ?';
    connection.query(query, [new_value, id, old_value], function (err, results) {
      connection.release();
      if (err) {
        console.error('Query error:', err);
        res.status(500).send('Query error');
        return;
      } else if (results.changedRows == 0) {
        res.status(401).send("Changed unsuccessfully");
      } else if (results.changedRows == 1) {
        res.send('Changed successfully')
      }
    });

  });
});

router.post('/changePassword', async function (req, res) {
  let old_value = req.body.old;
  let new_value = req.body.new;
  let id = req.body.id;
  let type = req.body.type;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = 'SELECT password FROM users WHERE user_id = ?';
    connection.query(query, [id], async function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      }
      if (results.length === 0) {
        console.error('UserId not correct:', id);
        res.status(401).send('UserId not correct');
        return;
      }

      const user = results[0];
      try {
        if (await argon2.verify(user.password, old_value)) {

          try {
            const new_hashed_password = await argon2.hash(new_value);

            req.volunteerDBPool.getConnection(function (err, connection) {
              if (err) {
                console.error('Database connection error:', err);
                return res.status(500).send('Database connection error');
              }

              const query = 'UPDATE users SET ' + type + ' = ? WHERE user_id = ?';
              connection.query(query, [new_hashed_password, id], function (err, results) {
                connection.release();
                if (err) {
                  console.error('Query error:', err);
                  return res.status(500).send('Querry error');
                }
                return res.send('New password registered successfully');
              });
            });
          } catch (err) {
            console.error('Unexpected error while changing password:', err);
            return res.status(500).send('Unexpected error while changing passowrd');
          }

        } else {
          res.status(401).send('Current password incorrect');
        }
      } catch (err) {
        console.error('Error verifying password:', err);
        res.status(500).send('Error verifying password');
      }
    });
  });
});

router.get('/manageAllUsers', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = 'SELECT role, email, phone, user_id, full_name FROM users';
    connection.query(query, function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      }

      res.send(results);
    });
  });
});

router.post('/editUserInfo', function (req, res) {
  const email = req.body.email;
  const phone = req.body.phone;
  const role = req.body.role;
  const full_name = req.body.fullname;
  const id = req.body.id;

  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('DB connection error:', err);
      return res.status(500).send('DB connection error');
    }

    const query = 'UPDATE users SET email = ?, phone = ?, role = ?, full_name = ? WHERE user_id = ?';
    connection.query(query, [email, phone, role, full_name, id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error', err);
        return res.status(500).send('Querry error');
      } else {
        return res.send('Updated succesfully!');
      }
    });
  })
});

router.post('/deleteBranch', function (req, res) {
  const branch_id = req.body.id;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = 'DELETE FROM branches WHERE branch_id = ?';
    connection.query(query, [branch_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error', err);
        return res.status(500).send('Querry error');
      } else {
        res.redirect(`/manageBranches`);
      }
    });
  });
});

router.get('/getAllBranch', function (req, res) {
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = `SELECT branches.branch_name, branches.branch_id, branches.manager_id email, users.email, users.user_id, users.full_name
                   FROM branches
                   LEFT JOIN users
                   ON branches.manager_id = users.user_id`;
    connection.query(query, function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      } else {
        return res.send(results);
      }
    });
  });
});

router.post('/addBranch', function (req, res) {
  const branch_name = req.body.old;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = `INSERT INTO branches (branch_name)
                  VALUES (?)
                  `;
    connection.query(query, [branch_name], function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      } else {
        res.status(200).send('Inserted succesfully');
      }
    });
  });
});


router.post('/editBranch', function (req, res) {
  const branch_id = req.body.branch_id;
  const branch_name = req.body.branch_name;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }

    const query = 'UPDATE branches SET branch_name = ? WHERE branch_id = ?'
      ;
    connection.query(query, [branch_name, branch_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      } else {
        res.redirect('/manageBranches');
      }
    });
  });
});

router.post('/editManager', function (req, res) {
  const branch_id = req.body.branch_id;
  const manager_id = req.body.manager_id;
  req.volunteerDBPool.getConnection(function (err, connection) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
      return;
    }
    const query = `UPDATE branches SET manager_id = ? WHERE branch_id = ?`;
    connection.query(query, [manager_id, branch_id], function (err, results) {
      connection.release();
      if (err) {
        console.error('Querry error:', err);
        res.status(500).send('Querry error');
        return;
      } else {
        res.redirect('/manageBranches');
      }
    });
  });
});


module.exports = router;

function sendMail(subscriber) {
  // Set up email options
  const mailOptions = {
    from: 'bluehope.nonprofit@gmail.com', // Use environment variable
    to: subscriber.email,
    subject: 'Subscription Confirmation',
    text: `Hello ${subscriber.first_name} ${subscriber.family_name},

    We are excited to inform you that a new ${eventType} has just been posted on our platform. We invite you to check out the latest updates and see how you can get involved.

    Stay connected and be part of the change!

    Best regards,
    The Blue Hope Volunteer Organisation Team`
      };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Subscription successful, but error sending email.');
    } else {
      return res.status(201).send('Subscription successful');
    }
  });
}