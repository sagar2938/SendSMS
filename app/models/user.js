var mongoose=require('mongoose');
var bycrypt=require('bycrypt');
var userSchema=mongoose.Schema({
  facebook:{
    id:String,
    token:String,
    email:String,
    name:String
  }
});


module.exports=mongoose.model('User',userSchema);
