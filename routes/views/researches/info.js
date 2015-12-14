var keystone = require('keystone');
exports = module.exports = function(req, res, next) {
    
    // var locals = res.locals;
	// // Load categories 载入左侧导航栏研究成果类别
    // var categoryPromise =  keystone.list('ResearchCategory').model.find().sort('_id').exec();
    // //todo: think about pagination querying 载入左侧导航栏研究成果类型
    // var statePromise =[{name:'draft',name_c:'计划'},{name:'archived',name_c:'进行'},{name:'published',name_c:'完成'}];  
	// // //载入左侧导航栏研究成果年份
	// // var archivesPromise = keystone.list('Research').model.aggregate([
	// // 		{$match:{year:{$exists:true}}},
	// // 		{ $group: { _id: "$year", total: { $sum: 1 } } },
	// // 		{ $sort: { _id: -1 }  }]).exe();
	// //两个查找结束后再返回
    // Promise.all([categoryPromise]).then(function(values){
    //     locals.categories = values[0];
	// 	//locals.archives=values[1];
	// 	locals.states=statePromise;
	// 	keystone.list('Research').model.aggregate([
	// 		{$match:{year:{$exists:true}}},
	// 		{ $group: { _id: "$year", total: { $sum: 1 } } },
	// 		{ $sort: { _id: -1 }  }], function(err, results){
	// 			if(err){
	// 				console.log("cant't aggregate post");
	// 				return next(err);
	// 			}
				
	// 			console.log('archive'+results[0]);
	// 			locals.archives = results;
	// 			next();
	// 		})		
    // });
    var locals = res.locals;
	var statePromise =[{name:'draft',name_c:'计划'},{name:'archived',name_c:'进行'},{name:'published',name_c:'完成'}]; 	
    var categoryPromise =  keystone.list('ResearchCategory').model.find().exec();	    

	Promise.all([categoryPromise]).then(function(values){
        locals.categories = values[0];
		locals.states=statePromise;		keystone.list('Research').model.aggregate([
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
};