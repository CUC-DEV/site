var keystone = require('keystone');
exports = module.exports = function(req, res, next) {
    var locals = res.locals;
	var statePromise =[{key:'draft',name:'计划'},{key:'archived',name:'进行'},{key:'published',name:'完成'}]; 	
    var categoryPromise =  keystone.list('ResearchCategory').model.find().exec();	    

	Promise.all([categoryPromise]).then(function(values){
        locals.categories = values[0];
		locals.states=statePromise;		
        keystone.list('Research').model.aggregate([
			{$match:{year:{$exists:true}}},
			{ $group: { _id: "$year", total: { $sum: 1 } } },
			{ $project:{name: '$_id', total:'$total', url: { $concat: [ '/researches/year/', '$_id']}}},
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
};