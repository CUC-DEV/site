var keystone = require('keystone');
var md = require('marked');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    var getid=req.params.title;
    
   	// Load rank article
	view.on('init', function(next) {
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
	
	// Load categories
	view.on('init', function(next) {
		keystone.list('PostCategory').model.find().select('name').exec(function(err, results) {
			
			if (err) {
				console.log("not find post categories ");
				return next(err);
			}
			console.log('categories'+results);
			locals.categories = results;
			next();
		});
		
	});
	
	//加载所要的文章
	view.on('init', function(next) {
		keystone.list('Post').model.find({_id:getid}).exec(function(err, result) {
			
			if (err) {
				console.log("not find post ");
				return next(err);
			}
			console.log('article'+result);
			locals.post = result;
			next();
		});
	});		
	
	// Load page intro
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "other", note:"posts-intro"}).where('state', 'published').exec(function(err, results) {
			
			if (err) {
				console.log("can't find posts intro ");
				return next(err);
			}
	
			if(results && results.length>0){
				locals.intro = results[0];
				console.log("posts intro "+locals.intro);
			}
			next();
		});
		
	});
	
	// Load slogan
	view.on('init', function(next) {
		
		keystone.list('Post').model.find({type: "other", note:"posts-slogan"}).where('state', 'published').exec(function(err, results) {
			
			if (err) {
				console.log("can't find posts slogan ");
				return next(err);
			}
	
			if(results && results.length>0){
				locals.slogan = results[0];
				console.log("posts slogan "+locals.slogan);
			}
			next();
		});
		
	});
		
    
    view.render('post');
    
}