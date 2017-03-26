'use strict'

const mongoose = require('mongoose');
const service = require('../services');
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');



function signUp(req, res)
{
	const user = new User({
		email: req.body.email,
		displayName: req.body.displayName
	});

	user.save((err) => {
		if(err) return res.status(500).send({message: `Error al crear el usuario ${err}`});

		return res.status(200).send({token: service.createToken(user)});
	});
}

function signIn(req, res)
{
	let email = req.body.email;
	let password = req.body.password;
	let user = User.findOne({'email':email},'email password', function(err, userRegistered){
		if(err) return res.status(500).send({message: `Ha ocurrido un error ${err}`});
		if(!userRegistered) return res.status(403).send({message: `No tiene acceso a la aplicación`});

		//res.status(200).send({user});
		let bool = userRegistered.comparePassword(password);
		//res.status(200).send({message: `Veredicto de la corte: ${bool}`});
		if(!bool) return res.status(403).send({message: `Credenciales inválidas`});
		
		return res.status(200).send({token: service.createToken(userRegistered)});
	} );

	

}


module.exports = {
	signUp,
	signIn
}