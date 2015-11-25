var keystone = require('keystone');
var md = require('marked');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
    
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
	
	// Load archive by year
	view.on('init', function(next) {
		keystone.list('Post').model.aggregate([
			{$match:{state:"published", publishDate:{$exists:true}}},
			{ $group: { _id: { $year: "$publishDate" }, total: { $sum: 1 } } },
			{ $sort: { total: -1 }  }], function(err, results){
				if(err){
					console.log("cant't aggregate post");
					return next(err);
				}
				
				console.log('archive'+results[0]);
				locals.archives = results;
				next();
			})
	});
	
	//最近修改
	view.on('init', function(next) {
		keystone.list('Post').model.find({state:"published"}).select('title').sort({'updatedAt':-1}).limit(5).exec(function(err, results) {
			
			if (err) {
				console.log("not find recents posts ");
				return next(err);
			}
			console.log('recents'+results);
			locals.recents = results;
			next();
		});
	});
		
    
    view.render('post');
    
}