const mongoose = require('mongoose');
const Bike = require("./models").Bike;
const User = require("./models").User;
var bcrypt = require('bcryptjs');
var session = require('express-session')



module.exports = {
    create: (req, res) => {
        let user = req.body
        bcrypt.hash(user.password, 10, function(err, hash){
            user.password = hash
            console.log(user)
            User.create(user, (err, user)=>{
                if(err){
                    console.log("server error", err.errors)
                    return res.status(400).json(err.errors)
                }else{
                    req.session.userid = user._id
                    res.json({'id':req.session.userid})
                }
            })
        })
    },

    login:(req,res) => {
        User.findOne({email:req.body.email}, function(err,user){
            if(err || user ==undefined){
                return res.status(400).json({'email':{'message':"Fields cannot be empty"}})
            }else{
                bcrypt.compare(req.body.password, user.password,function(err,result){
                    if(err){
                        console.log("err1",err)
                        return res.status(400).json({'email':{"message":"Email not found"}})
                    }else if(result){
                        req.session.userid = user._id
                        res.json({'message':'success','id':req.session.userid})
                    }else{
                        console.log("err2",err)
						return res.status(400).json({'password':{"message":"Password doesnt match"}})
                    }
                })
            }
        })
    },

    logout: (req,res)=>{
        delete req.session.userid
        res.json({'message':'logged out'})
    },

    getid:(req,res)=>{
        if(req.session.userid){
            console.log("session ID"+req.session.userid)
            return res.json({'id': `&{req.session.userid}`})
        }else{
            res.status(400).json({'err':"not logged in"})
        }

    },

    showAll: (req,res) => {
		Bike.find({}).sort({'createdAt':'desc'}).exec((err,Bikes)=>{
			if(err){
				res.status(400).json(err.errors);
			}
			else{
				res.json(Bikes)
			}
		})
	},
	create: (req,res) => {
		Bike.create(req.body,(err)=>{
			if(err){
				console.log("server",err.errors)
				res.status(400).json(err.errors)
			}
			else{
				res.json({"message":"created successfully"})
			}
		})
	},
	show: (req,res) => {
		Bike.findOne({_id:req.params.id},(err,Bike) => {
			if(err){
				res.status(400).json(err.errors)
			}
			else{
				res.json(Bike)
			}
		})
	},
	update: (req,res) => {
		Bike.findOneAndUpdate({_id:req.params.id},req.body,{runValidators:true},(err,Bike)=>{
			if(err){
				res.status(400).json(err.errors)
			}
			else{
				console.log("updated"+Bike)
				res.json(Bike)
			}
		})
	},
	destroy: (req,res)=>{
		Bike.remove({_id:req.params.id},(err)=>{
			if(err){
				res.status(400).json(err.errors)
			}
			else{
				res.json({"message":"deleted successfully"})
			}
		})
	},
	search:(req,res)=>{
		console.log("searching for "+req.body.search)
		Bike.find({'title':{'$regex':req.body.search,'$options':'i'}},(err,bikes)=>{
			if(err){
				console.log("found nothing")
				res.json({'message':"nothing"})
			}
			else{
				console.log("found:"+ bikes)
				res.json({bikes:bikes})
			}
		})
	},

	getContact:(req,res) =>{
		User.findById({_id:req.params.id},(err))
		if(err){
			res.status(400).json(err.errors)
		}
		else{user =>{
			let contactInfo = {};
			contactInfo["first_name"] = user.first_name;
			contactInfo["email"] = user.email;
			res.json(contactInfo);
		}}
		
	}



}
