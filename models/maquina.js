const mongoose=require('mongoose'),
	Schema=mongoose.Schema;

	const usuarioSchema=new Schema({
		usuario:String,
		password:String
	});

	module.exports=mongoose.model('usuario',usuarioSchema);