var keystone = require('keystone');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    // Load news
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "home"}).where('state', 'published').populate('images').sort('rank').limit(3).exec(function(err, results) {
			
			if (err) {
				console.log("can't find hot news");
				return next(err);
			}
	
			locals.news = results;
			console.log('news '+results);
			next();
		});
		
	});
	
	    // Load lab intro
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "other", note:"home-intro"}).where('state', 'published').exec(function(err, results) {
			
			if (err) {
				console.log("can't find 实验室简介 ");
				return next(err);
			}
	
			if(results && results.length>0){
				locals.intro = results[0];
				console.log("实验室简介 "+locals.intro);
			}
			next();
		});
		
	});
	
	// Load slogan
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "other", note:"home-slogan"}).where('state', 'published').exec(function(err, results) {
			
			if (err) {
				console.log("can't find home slogan ");
				return next(err);
			}
	
			if(results && results.length>0){
				locals.slogan = results[0];
				console.log("home slogan "+locals.slogan);
			}
			next();
		});
		
	});
    
    
    view.render('home');
    
}