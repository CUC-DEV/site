 var keystone = require('keystone');
 
 exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res),
    locals = res.locals;
	var getitem=req.params.item;
    var getname=req.params.name;
    
    
	if(getitem=='categorie'){
	//按照‘类别’进行查找
	////先找到对应‘类别’的_id值
	view.on('init', function(next) {
		keystone.list('ResearchCategory').model.find({name:getname},{'_id':1}).exec(function(err, result) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals._id= result;
			next();
		});
	});
	////对特定的_id进行查找
	view.on('init', function(next) {
		
		keystone.list('Research').model.find({categories:locals._id}).populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});	
	}else if(getitem=='state'){
	//按照‘归档’进行查找	
	view.on('init', function(next) {
		
		keystone.list('Research').model.find({state:getname}).populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});		
		
	}else if(getitem=='date'){
	//按照‘日期’进行查找
	view.on('init', function(next) {
		
		keystone.list('Research').model.find({year:getname}).populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});		
		
	}else{
    	//Load all categories
	view.on('init', function(next) {
		
		keystone.list('Research').model.find({}).populate('images').sort('rank').exec(function(err, results) {
			
			if (err) {
				console.log("not find research ");
				return next(err);
			}
	
			locals.researches = results;
			next();
		});
		
	});		
		
	}

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
	
    view.render('researchcategory');
    
}