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
	    	// Load categories
	view.on('init', function(next) {
		keystone.list('ResearchCategory').model.find().sort('_id').exec(function(err, results) {
			
			if (err) {
				console.log("not find research categories ");
				return next(err);
			}
			console.log('categories'+results);
			locals.categories = results;
			next();
		});
		
	});

		// Load archive by years
	view.on('init', function(next) {
		keystone.list('Research').model.aggregate([
			{$match:{year:{$exists:true}}},
			{ $group: { _id: "$year", total: { $sum: 1 } } },
			{ $sort: { _id: -1 }  }], function(err, results){
				if(err){
					console.log("cant't aggregate post");
					return next(err);
				}
				
				console.log('archive'+results[0]);
				locals.archives = results;
				next();
			})
	});
    
    view.render('researchdetail');
    
}