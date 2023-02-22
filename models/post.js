const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    postBoday: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now},
    publish: { type: Boolean, required: true}
})

module.exports = mongoose.model("Post", PostSchema);