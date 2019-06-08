const Entry = require('../models/entry.model');
const router = require('express').Router();

exports.test = function (req, res) {
    res.send('Greetings from the test route of the entry controller!');
};

exports.index = (req, res, next) => {
    return Entry.find()
        .sort({createdAt: 'descending'})
        .then((entries) => res.json({entries: entries.map(entry => entry.toJSON())}))
        .catch(next);
}

exports.store = (req,res, next) => {
    const {body} = req;

    if(!body.title){
        return res.status(422).json({
            errors: {
                title: 'is required',
            }
        });
    }

    if(!body.author){
        return res.status(422).json({
            errors: {
                author: 'is required',
            },
        });
    }

    if(!body.body){
        return res.status(422).json({
            errors: {
                body: 'is required',
            },
        });
    }

    const entry = new Entry(body);
    return entry.save()
        .then(() => res.json({entry: entry.toJSON()}))
        .catch(next);
}

router.param('id', (req, res, next, id) => {
    return Article.findById(id, (err, article) => {
        if(err){
            return res.sendStatus(494);
        }else if(article) {
            req.article = article;
            return next();
        }
    }).catch(next);
});


exports.single = (req, res) => {
    Entry.findById(req.params.id, (err, entry) => {
        if(err) return next(err);
        res.send(entry);
    })
}

exports.update = (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, entry) => {
        if(err) return next(err);
        res.send('Entry Updated');
    });
};

exports.delete = (req, res) => {
    Entry.findByIdAndDelete(req.params.id, (err) => {
        if(err) return next(err);
        res.json('Deleted Entry Successfully');
    })
}