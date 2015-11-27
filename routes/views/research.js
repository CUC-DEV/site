var keystone = require('keystone');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
    locals = res.locals;
    
    	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('Research').model.find({}).where('state', 'published').populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});
    
    view.render('research');
    
}