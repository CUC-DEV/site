 var keystone = require('keystone');
 
 exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    var getid=req.params.id;
    view.on('init', function(next) {
		
		keystone.list('Research').model.find({_id:getid}).populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});	
    
    view.render('researchdetail');
    
}