'use strict';

const User = require('../models/User')

function registerUser(req, res)
{
	let user = new User();
		user.email = req.body.email;
		user.displayName = req.body.displayName;
		user.avatar = req.body.avatar;
		user.password = req.body.password;
	

	user.save((err, userStored) => {
		if(err) return res.status(500).send({message: `Ha ocurrido un error al guardar el usuario en la base de datos: ${err}`});

		res.status(200).send({user: userStored});		
	});
}

function getAllUsers(req, res)
{
	User.find({}, (err, users) => {
		if(err) return res.status(500).send({message: `Error al buscar usuarios ${err}`});
		if(!users) return res.status(404).send({message: "No hay usuarios que mostrar"});

		res.status(200).send({users});
	});		
}

module.exports = {
	registerUser,
	getAllUsers	
}