var keystone = require('keystone');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    // Load news
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "home"}).where('state', 'published').populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find news ");
				return next(err);
			}
	
			locals.news = results;
			next();
		});
		
	});
	
	    // Load news
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "other", title:"实验室简介"}).where('state', 'published').exec(function(err, results) {
			
			if (err) {
				console.log("not find 实验室简介 ");
				return next(err);
			}
	
			if(results && results.length>0){
				locals.intro = results[0];
				console.log("实验室简介 "+locals.intro);
			}
			next();
		});
		
	});
    
    view.render('index');
    
}