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
	
	    // Load lab intro
	view.on('init', function(next) {
		
		keystone.list('TextData').model.findOne({technicalKey:"home-intro"}).where('state', 'published').exec(function(err, intro) {
			
			if (err || !intro) {
				console.log("can't find 实验室简介 error ");
				return next(err);
			}

            locals.intro = intro;
			next();
		});
		
	});
	
	// Load slogan
	view.on('init', function(next) {
		
		keystone.list('TextData').model.findOne({technicalKey:"home-slogan"}).where('state', 'published').exec(function(err, slogan) {
			
			if (err || !slogan) {
				console.log("can't find home slogan ");
				return next(err);
			}

            locals.slogan = slogan
			next();
		});
		
	});
    
    
    view.render('home');
    
}