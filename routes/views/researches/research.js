var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals,
			id=req.params.id;

    view.on('init', function(next) {
        locals.researches = [];
        keystone.list('Research').model.findOne({_id: id}).populate('images').populate('members').exec(function(err, research) {
            if (err) {
                console.log("not find news ");
                return next(err);
            }

            if(research){
                locals.researches.push(research)
            }

            next();
        });

    });

	view.render('researchdetail');

};