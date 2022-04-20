//imports
const express = require('express');
const router = express.Router();

//import the controller methods
// const { *methods } = require('./controllers/*');

//unauthenticated routes
router.get('/dashboard', (req, res) => console.log('dash'))
router.get('/recipe/:id', (req, res) => console.log('recipe/id'))
router.get('/category/:id', (req, res) => console.log('cat/id'))
router.get('/profile/:id', (req, res) => console.log('profile/id'))
router.post('/register', (req, res) => console.log('register'))
router.post('/login', (req, res) => console.log('login'))

//authenticated routes
router.post('/recipe/create', (req, res) => console.log('recipe/create'))
router.patch('/recipe/rate', (req, res) => console.log('recipe/rate'))
router.patch('/recipe/like', (req, res) => console.log('recipe/like'))
router.patch('/profile/edit', (req, res) => console.log('profile/edit'))
router.delete('/recipe/delete', (req, res) => console.log('recipe/delete'))



//export the router
module.exports = router;