var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals,
			state=req.params.state;

    view.on('init', function(next) {
        keystone.list('Research').model.find({state: state}).exec(function(err, researches) {
            if (err) {
                console.log("not find researches ");
                return next(err);
            }

            locals.researches = researches;

            next();
        });

    });

	view.render('researches');

};