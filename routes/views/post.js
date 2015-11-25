var keystone = require('keystone');
var md = require('marked');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
   	// Load rank article
	view.on('init', function(next) {
		console.log("will query db ");
		keystone.list('Post').model.find({type: "post"}).where('state', 'published').sort('rank').limit(1).exec(function(err, result) {
			
			if (err) {
				console.log("not find news ");
				return next(err);
			}
			if (result.length === 1){
				locals.rank = result[0];
				console.log("rank article "+locals.rank);
			}
			next();
		});
		
	});
    
    view.render('post');
    
}