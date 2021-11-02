const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userone:userone@ictakfiles.uq40y.mongodb.net/DIWALI?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost:27017/diwali');
const Schema = mongoose.Schema

const wishSchema = new Schema({

    name:String,
    rname:String,
    email:String,

});

var wishdata = mongoose.model('wishdata',wishSchema);

module.exports =wishdata;