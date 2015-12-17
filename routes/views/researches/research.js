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
    view.on('init', function(next) {
        locals.leader= [];
        keystone.list('Research').model.findOne({_id: id}).populate('leader').exec(function(err, leader) {
            if (err) {
                console.log("leader");
                return next(err);
            }

            if(leader){
                locals.leader.push(leader)
            }

            next();
        });

    });
    view.on('init', function(next) {
        locals.authors= [];
        keystone.list('Research').model.findOne({_id: id}).populate('authors').exec(function(err, authors) {
            if (err) {
                console.log("not find authors ");
                return next(err);
            }

            if(authors){
                locals.authors.push(authors)
                //console.log(locals.authors[0].authors[0].name);
            }

            next();
        });

    });    
    

	view.render('researchdetail');

};