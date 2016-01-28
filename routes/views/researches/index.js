var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
    locals = res.locals;	
	
    view.on('init', function(next) {
		
		keystone.list('Research').model.find({}).populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});		

    view.render('researches');
    
};