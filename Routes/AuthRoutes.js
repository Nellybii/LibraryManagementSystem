const express = require('express');
const Router = express.Router();
const AuthController = require('../Controllers/AuthController');

    Router.post('/register', AuthController.registerUser);
    Router.post('/login', AuthController.loginUser);


module.exports = Router;