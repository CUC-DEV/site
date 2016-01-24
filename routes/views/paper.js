/*var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);
			locals=res.locals;
			
	//load categories
	
	/*view.on('init', function(next) {
		keystone.list('ResearchCategory').model.find({key:"paper"},{'_id':1}).exec(function(err, results) {
			
			if (err) {
				console.log("not find category ");
				return next(err);
			}
	
			locals._id= results;
			next();
		});
	});*/
			
	//load paper
	/*view.on('init',function(next){
		
		keystone.list('Research').model.find({}).exec(function(err,results){
			
			if(err){
				console.log("paper not found");
				return next(err);
			}
			
			locals.papers = results;
			next();
			
		});
		
	});
    
    view.render('paper');
    
}*/

var keystone = require('keystone');

exports = module.exports = function(req,res){
	
	var view = new keystone.View(req,res);
	
	view.render('paper');
	
}