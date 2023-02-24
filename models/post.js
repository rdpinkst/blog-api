const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    postBody: { type: String, required: true },
    publish: { type: String, required: true}
}, {
    timpestamps: true
})

module.exports = mongoose.model("Post", PostSchema);