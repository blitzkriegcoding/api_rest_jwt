'use strict'
const Product = require('../models/Product');

function getProduct (req, res)
{
	let productId = req.params.productId;
	Product.findById(productId, (err, product) => {
		if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`});

		if(!product) return res.status(404).send({ message: `Producto no existe` });

		res.status(200).send({product});
	});	
}

function getProducts (req, res)
{
	Product.find({}, (err, products) => {
		if(err) return res.status(500).send({message: `Error al buscar productos ${err}`});
		if(!products) return res.status(404).send({message: "No hay productos que mostrar"});

		res.status(200).send({products});
	});	
}

function updateProduct (req, res)
{
	let productId = req.params.productId;
	let update = req.body
	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if(err) return res.status(500).send({message: `Ha ocurrido un error al actualizar: ${err}`});
		if(!productUpdated) return res.status(404).send({message: `Producto no encontrado`});

		res.status(200).send({product: productUpdated});
	});
}

function saveProduct(req, res)
{
	console.log('POST api/product');
	console.log(req.body);
	let product = new Product();
	product.name 		= req.body.name;
	product.price 		= req.body.price;
	product.picture 	= req.body.picture;
	product.category 	= req.body.category;
	product.description = req.body.description;

	product.save((err, productStored) => {
		if(err) return res.status(500).send({message: `Ha ocurrido un error al guardar el producto en la base de datos: ${err}`});

		res.status(200).send({product: productStored});
	});
	//res.status(200).send({message: "El producto sea ha recibido"});
}

function deleteProduct(req, res)
{
	let productId = req.params.productId;

	Product.findById(productId, (err, product) =>{
		if(err) return res.status(500).send({message: `Ha ocurrido un error interno en el servido ${err}`});

		if(!product) return res.status(404).send({message: `Producto no encontrado`});

		product.remove(err => {
			if(err) return res.status(500).send({message: `Error al borrar producto ${err}`});

			res.status(200).send({message: `El producto ${product.name} ha sido eliminado`});
		});
	});
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}
