'use strict'

const express = require('express');
const ProductCtrl = require('../controllers/product');
const UserCtrl = require('../controllers/user');
const AuthCtrl = require('../controllers/auth');
const api = express.Router();
const auth = require('../middlewares/auth');

/**
*
* Configurando rutas
*/
api.get('/product', ProductCtrl.getProducts);
api.get('/product/:productId', ProductCtrl.getProduct);
api.post('/product', ProductCtrl.saveProduct);
api.put('/product/:productId',  ProductCtrl.updateProduct);
api.post('/user/registry', UserCtrl.registerUser); 
api.get('/user', UserCtrl.getAllUsers); 
api.post('/user/sign_in', AuthCtrl.signIn);
// api.get('/private', auth.isAuth ,(req, res) => {
// 	res.status(200).send({message: 'Acceso autorizado'});
// });

module.exports = api;