var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    //最近修改
	view.on('init', function(next) {
		keystone.list('Activity').model.find({state:"published"}).sort({'date':-1}).limit(5).populate('photos').exec(function(err, results) {
			
			if (err) {
				console.log("not find recents activities ");
				return next(err);
			}
			console.log('recents'+results);
			locals.recents = results;
			next();
		});
	});
	
    
    view.render('activities');
    
}