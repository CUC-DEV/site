var keystone = require('keystone');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "home"}).where('state', 'published').populate('images').sort('rank').exec(function(err, results) {
			
			if (err || !results.length) {
				console.log("not find news ");
				return next(err);
			}
			
			console.log("news length "+results.length);
			console.log("find news "+results);
			console.log("image "+results[0].images[0].image);
			locals.news = results;
			next();
		});
		
	});
    
    view.render('index');
    
}