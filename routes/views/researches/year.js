var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals,
			year = req.params.year;

    view.on('init', function(next) {
        keystone.list('Research').model.find({year:year}).populate('images').sort('rank').exec(function(err, researches) {
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
