const mongoose = require('mongoose');

const {Schema} = mongoose;

const EntrySchema = new Schema({
    title: String,
    body: String,
    author: String,
}, {timestamps: true});

EntrySchema.methods.toJson = function(){
    return {
        _id: this.id,
        title: this.title,
        body: this.body,
        author: this.author,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};

mongoose.model('Entries', EntrySchema);