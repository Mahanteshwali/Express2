const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    password:{type:String,reqiured:true,trim:true},
    email:{type:String,required:true,trim:true},
    gender:{type:String,required:true,trim:true,enum:["Male","Female"]},
    number:{type:Number,reqiured:true,trim:true,min:10},
    date_of_birth:{type:String,requires:true,trim:true},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model('Authenicaton',UserSchema);