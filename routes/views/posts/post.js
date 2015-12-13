var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals,
			id=req.params.id;

    view.on('init', function(next) {
        locals.posts = [];
        keystone.list('Post').model.findOne({_id: id, state : 'published'}).exec(function(err, post) {
            var posts = [];
            if (err) {
                console.log("not find news ");
                return next(err);
            }

            if(post){
                locals.posts.push(post)
            }

            next();
        });

    });

	view.render('posts');

};