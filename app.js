const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const logger = require('morgan');
const multer = require('multer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const mysql = require('mysql');
const { promisify } = require('util'); // Add promisify from util

// Initialize Express app
const app = express();

// Setup MySQL connection pool
const volunteerDBPool = mysql.createPool({
    host: 'localhost',
    database: 'volunteer'
});
const query = promisify(volunteerDBPool.query).bind(volunteerDBPool);

// Middleware to set connection pool for volunteer database
app.use((req, res, next) => {
    req.volunteerDBPool = volunteerDBPool;
    next();
});

// Configure session middleware
app.use(session({
    secret: 'mysecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport strategies
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
async function saveOrUpdateUser(user, query) {
  const insertQuery = `
    INSERT INTO users (full_name, email, user_name, password, role)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      full_name = VALUES(full_name),
      email = VALUES(email)
  `;

  try {
    // Run the query
    const result = await query(insertQuery, [user.fullName, user.email, user.userName, user.password, user.role]);

    let userId;

    if (result.insertId) {
      userId = result.insertId;
    } else {
      const selectQuery = `SELECT user_id FROM users WHERE email = ?`;
      const rows = await query(selectQuery, [user.email]);

      if (rows.length > 0) {
        userId = rows[0].user_id;
      } else {
        throw new Error('User not found after update.');
      }
    }

    return userId;
  } catch (error) {
    throw error;
  }
}

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      userName: profile.emails[0].value,
      password: '',
      role: 'user'
    };
    const userId = await saveOrUpdateUser(user, query);

    // Attach the userId to the user object
    user.id = userId;

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'emails']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const user = {
      fullName: profile.displayName,
      email: profile.emails[0].value,
      userName: profile.emails[0].value,
      password: '',
      role: 'user'
    };
    const userId = await saveOrUpdateUser(user, query);

    user.id = userId;

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route to check for userId in cookies
app.get('/check-cookie', (req, res) => {
  if (req.cookies.userId) {
      res.send(`User ID found in cookie: ${req.cookies.userId}`);
  } else {
      res.send('User ID not found in cookies');
  }
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Export the app
module.exports = app;
