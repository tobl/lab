var mongoose = require('mongoose'), Schema = mongoose.Schema;
var MessageSchema = new Schema({
    m_id: String,
    message: String,
    date: String
});
mongoose.model('Message', MessageSchema);