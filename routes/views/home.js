var keystone = require('keystone');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    // Load news
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({isHotNews: true}).where('state', 'published').populate('images').sort('rank').limit(3).exec(function(err, results) {
			
			if (err) {
				console.log("can't find hot news");
				return next(err);
			}
	
			locals.news = results;
			next();
		});
		
	});
    
    view.render('home');
    
}