var mongoose = require('mongoose'), Schema = mongoose.Schema;
var MessageSchema = new Schema({
    message: String,
    date: String
});
mongoose.model('Message', MessageSchema);