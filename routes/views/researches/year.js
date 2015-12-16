var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals,
			year = parseInt(req.params.year);

    view.on('init', function(next) {
        keystone.list('Research').model.find({publishedAt:{$gte: new Date(year,0,1,0), $lt: new Date(year+1,0,1,0) }, state : 'published'}).populate('images').exec(function(err, researches) {
            if (err) {
                console.log("not find news ");
                return next(err);
            }

            locals.researches=researches;
            next();
        });

    });

	view.render('researches');

};
