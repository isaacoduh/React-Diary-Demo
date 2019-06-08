const mongoose = require('mongoose');
const router = require('express').Router();
const Entries = mongoose.model('Entries');

router.post('/', (req, res, next) => {
    const {body} = req;

    if(!body.title){
        return res.status(422).json({
            errors: {
                title: 'is required',
            },
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
                body: 'is required'
            },
        });
    }

    const finalEntry = new Entries(body);
    return finalEntry.save()
        .then(() => res.json({entry: finalEntry.toJSON()}))
        .catch(next);
});

router.get('/', (req, res, next) => {
    return Entries.find()
        .sort({createdAt: 'descending'})
        .then((entries) => res.json({entries: entries.map(entry => entry.toJSON())}))
        .catch(next);
});

router.param('id', (req,res,next,id) => {
    return Entries.findById(id, (err, entry) => {
        if(err){
            return res.sendStatus(404);
        }else if(entry){
            req.entry = entry;
            return next();
        }
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    return res.json({
        entry: req.entry.toJSON(),
    });
});

router.patch('/:id', (req, res, next) => {
    const {body} = req;

    if(typeof body.title !== 'undefined'){
        req.entry.title = body.title;
    }

    if(typeof body.author !== 'undefined'){
        req.entry.author = body.body;
    }

    if(typeof body.body !== 'undefined'){
        req.article.body = body.body;
    }
    
    return req.entry.save()
        .then(() => res.json({article: req.article.toJSON()}))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    return Entries.findByIdAndRemove(req.entry._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;