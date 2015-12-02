 var keystone = require('keystone');
 
 exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    	//Load all categories
	view.on('init', function(next) {
		
		keystone.list('Member').model.find({type: "student"}).populate('images').sort('Year.Graduated').exec(function(err, results) {
			
			if (err || !results.length) {
				console.log("not find news ");
				return next(err);
			}
			
			console.log("news length "+results.length);
			console.log("find news "+results)
			locals.members = results;
			next();
		});
		
	});
    view.render('members');
    
}