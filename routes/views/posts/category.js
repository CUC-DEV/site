var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals,
			id=req.params.id;

    view.on('init', function(next) {
        keystone.list('Post').model.find({categories: id, state : 'published'}).exec(function(err, posts) {
            if (err) {
                console.log("not find news ");
                return next(err);
            }

            locals.posts = posts;

            next();
        });

    });

	view.render('posts');

};