const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true},
    username: { type: String, required: true},
    comment: { type: String, required: true},
    timeStamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Comment", CommentSchema);