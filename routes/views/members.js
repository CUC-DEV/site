 var keystone = require('keystone');
 
 exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
    //载入在读成员
	view.on('init', function(next) {
		keystone.list('Member').model.find({'type':'student', 'graduatedDate' :{'$gte': Date.now()}}).sort('-graduatedDate').populate('photo').exec(function(err, results) {
			
			if (err) {
				console.log("can't find student ");
				return next(err);
			}
			
			locals.students = results;
			next();
		});
		
	});
	
	 //载入毕业成员
	view.on('init', function(next) {
		keystone.list('Member').model.find({'type':'student', 'graduatedDate' :{'$lt': Date.now()}}).sort('-graduatedDate').populate('photo').exec(function(err, results) {
			
			if (err) {
				console.log("can't find student ");
				return next(err);
			}
			
			locals.graduated = results;
			next();
		});
		
	});
	
		 //载入教师成员
	view.on('init', function(next) {
		keystone.list('Member').model.find({'type':'teacher'}).populate('photo').exec(function(err, results) {
			
			if (err) {
				console.log("can't find teachers ");
				return next(err);
			}
			
			locals.teachers = results;
			next();
		});
		
	});
	
    view.render('members');
    
}