// Using Node.js `require()`
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const User = new Schema({
    username: { type: String, require: true, },
    password: { type: String, require: true, },
    email: { type: String, require: true, },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User);
