const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/bike_app', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({
	first_name:{type:String, required:[true,'First Name required'], minlength:2},
	last_name:{type:String, required:[true,'Last Name required'], minlength:2},
	email:{type:String, required:[true,'Email required'], minlength:2, unique:true, match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Email is not valid"]},
    password:{type:String, required:[true,'Password required'], minlength:6},
    bikes:[{ref:"Bike", type: mongoose.Schema.Types.ObjectId}],
});

UserSchema.plugin(uniqueValidator);


var BikeSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Post title must be provided"],
        minlength: [4, 'Title must have at least 4 characters']
      },
      price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [1, "Price must be at least $1"]
      },
      description: {
        type: String,
        required: [true, 'Must provide description of this Camera'],
        maxlength: [200, 'Description should be less than 200 characters.']
      },
      location: {
        type: String,
        required: [true, 'Location must be provided']
      },
      image: {
        type: String,
        required: true,
      },
      user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      }
    },{ timestamps: true });

module.exports = {
    User: mongoose.model('User', UserSchema),
    Bike: mongoose.model('Bike', BikeSchema),
};