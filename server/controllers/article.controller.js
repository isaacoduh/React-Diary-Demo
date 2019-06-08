const Article = require('../models/article.model');
const router = require('express').Router();

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the test route of the article controller!');
};

exports.index = (req, res, next) => {
    return Article.find()
        .sort({createdAt: 'descending'})
        .then((articles) => res.json({articles: articles.map(article => article.toJSON())}))
        .catch(next);
}
exports.store = (req, res, next) => {
    const {body} = req;

    if(!body.title) {
        return res.status(422).json({
            errors: {
            title: 'is required',
            },
        });
    }

    if(!body.author) {
        return res.status(422).json({
            errors: {
            author: 'is required',
            },
        });
    }

    if(!body.body) {
        return res.status(422).json({
            errors: {
            body: 'is required',
            },
        });
    }
    const article = new Article(body);
    return article.save()
        .then(() => res.json({article: article.toJSON()}))
        .catch(next);
};

// exports.single = (req, res, next) =>{
//     Article.findById(req.params.id, (err, article) =>{
//         if(err) return next(err);
//         return res.json({
//             article: req.article.toJSON(),
//         });
//     });
// };
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
    Article.findById(req.params.id, (err, article) => {
        if(err) return next(err);
        res.send(article);
    });
};

exports.update = (req, res) => {
    Article.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, article) => {
        if(err) return next(err);
        res.send('Article Updated.');
    });
};

exports.delete = (req, res) => {
    Article.findByIdAndDelete(req.params.id, (err) =>{
        if(err) return next(err);
        res.json('Deleted Successfully');
    })
}