const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jwt-simple');

const protectedRoute = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Invalid JWT');
  }

  try {
    const decodedToken = jwt.decode(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).send('Invalid JWT');
    }

    const expired = decodedToken.expiration - Date.now() / 1000;

    // Checks if JWT is expired
    if (expired > 0) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(401).send('Invalid JWT');
    }
  } catch (error) {
    // If JWT has been modified or fails to decode
    return res.status(401).send('Invalid JWT');
  }
};

// Get favorited recipes
router.get('/favorites', protectedRoute, (req, res) => {
  const userId = req.query.id;
  User.findById(userId)
    .exec()
    .then((user) => {
      res.status(200).send(user.favorites);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Signup
router.post('/register', (req, res) => {
  User.find({ username: req.body.username })
    .exec()
    .then((users) => {
      if (users.length > 0) {
        return res.status(409).json({ message: 'Username is taken' });
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (!passwordPattern.test(req.body.password)) {
        return res.status(400).json({ message: 'Invalid Password' });
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Server error');
        }

        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Server error');
          }
          const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
          });

          newUser
            .save()
            .then((user) => {
              res.status(200).send('User added to the database');
            })
            .catch((err) => {
              res
                .status(500)
                .json({ message: 'User failed to be added', error: err });
            });
        });
      });
    });
});

// Login
router.post('/login', (req, res) => {
  const username = req.body.username;
  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    bcrypt.compare(req.body.password, user.password, (err, passwordMatched) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server error');
      }

      if (passwordMatched) {
        // 10 day expiration in seconds
        const jwtExpiration = (Date.now() + 1000 * 60 * 60 * 24 * 10) / 1000;

        // Creates JWT
        const token = jwt.encode(
          {
            id: user._id,
            username: user.username,
            expiration: jwtExpiration,
          },
          process.env.SECRET_KEY
        );

        return res.status(200).json({
          message: 'Login successful',
          username: user.username,
          id: user._id,
          token: token,
        });
      }
    });
  });
});

router.get('/verify-jwt', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res
      .status(200)
      .json({ message: 'invalid JWT', authenticated: false });
  }

  try {
    const decodedToken = jwt.decode(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(200).json({
        message: 'Invalid JWT',
        authenticated: false,
      });
    }

    const expired = decodedToken.expiration - Date.now() / 1000;

    if (expired > 0) {
      return res.status(200).json({
        message: 'Valid JWT',
        authenticated: true,
        username: decodedToken.username,
        id: decodedToken.id,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: 'Invalid JWT',
      authenticated: false,
    });
  }
});

// Update user's username or password
router.put('/update', protectedRoute, (req, res) => {
  const userId = req.user.id;
  const username = req.body.username;
  const password = req.body.password;

  if (username === '' && password === '') {
    return res.status(400).send('No username or password was provided');
  }

  User.findOne({ username }).then((foundUser) => {
    if (foundUser) {
      return res
        .status(200)
        .json({ message: 'Username is already taken', exists: true });
    }

    User.findById(userId).then((user) => {
      // Change only the password
      if (username === '') {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Server error');
          }
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Server error');
            }

            user.password = hashedPassword;
            user.save();
            return res.status(200).json({
              message: 'Password changed successfully',
              exists: false,
            });
          });
        });
      }
      // Change only the username
      else if (password === '') {
        user.username = username;
        user.save();
        return res.status(200).json({
          message: 'Username changed successfully',
          username: username,
          exists: false,
        });
      }
      // Change both the username and password
      else {
        user.username = username;
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Server error');
          }
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Server error');
            }

            user.password = hashedPassword;
            user.save();
            return res.status(200).json({
              message: 'Changes made successfully',
              username: username,
              exists: false,
            });
          });
        });
      }
    });
  });
});

// Delete user
router.delete('/delete', protectedRoute, (req, res) => {
  const userId = req.user.id;
  User.findByIdAndDelete(userId)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .json({ message: 'Could not find a user by that ID' });
      }

      res.status(200).json({ message: 'Your account has been deleted' });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update favorited recipes
router.put('/update/favorites', protectedRoute, (req, res) => {
  const userId = req.body.id;
  const favoritedRecipe = req.body.favoritedRecipe;

  User.findById(userId)
    .then((user) => {
      let favorites = user?.favorites;

      if (favorites) {
        const recipeExists = user.favorites.some(
          (recipe) => recipe.recipeId === favoritedRecipe.recipeId
        );

        if (recipeExists) {
          favorites = favorites.filter(
            (recipe) => recipe.recipeId !== favoritedRecipe.recipeId
          );
          user.favorites = favorites;
        } else {
          user.favorites = [...favorites, favoritedRecipe];
        }
      } else {
        user.favorites = [favoritedRecipe];
      }
      user.save();
      res.status(200).send('Operation was successful');
    })
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
