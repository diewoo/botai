const mongoose=require('mongoose'),
	Schema=mongoose.Schema;

	const usuarioSchema=new Schema({
		
		username:String,
		password:String
		
	});

	module.exports=mongoose.model('users',usuarioSchema);