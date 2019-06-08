const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    title: {type: String, required: true, max: 100},
    body: {type: String, required: true},
    author: {type: String, required: true},
}, {timestamps: true});

EntrySchema.methods.toJSON = function() {
    return {
        _id: this._id,
        title: this.title,
        body: this.body,
        author: this.author,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

module.exports = mongoose.model('Entry', EntrySchema);