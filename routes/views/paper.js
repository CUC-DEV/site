var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
			locals = res.locals;
	//load paper
	view.on('init',function(next){
		
		keystone.list('Paper').model.find({}).sort('-CreatedAt').exec(function(err,results){
			
			if(err){
				console.log("paper not found");
				return next(err);
			}
			
			locals.papers = results;
			next();
			
		});
		
	});
    
    view.render('paper');
    
}

/*var keystone = require('keystone');

exports = module.exports = function(req,res){
	
	var view = new keystone.View(req,res);
	
	view.render('paper');
	
}*/