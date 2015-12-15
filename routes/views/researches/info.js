var keystone = require('keystone');
exports = module.exports = function(req, res, next) {
    var locals = res.locals;
	locals.progressUrls =[{key:'to_do',name:'计划',url:'/researches/progress/to_do'},
					   {key:'doing',name:'进行',url:'/researches/progress/doing'},
					   {key:'done',name:'完成',url:'/researches/progress/done'}];

    var categoryPromise =  keystone.list('ResearchCategory').model.find().exec();	    

	Promise.all([categoryPromise]).then(function(values){
        locals.categories = values[0];

        keystone.list('Research').model.aggregate([
            {$match:{state:"published", publishedAt:{$exists:true}}},
            {$project: { year : { $dateToString: { format: "%Y", date: "$begin" }}}},
            { $group: { _id: '$year' , total: { $sum: 1 }}},
            { $project:{name: '$_id', total:'$total', url: { $concat: [ '/researches/year/', '$_id']}}},
            { $sort: { name: -1 } }], function(err, results){
				if(err){
					console.log("cant't aggregate post");
					return next(err);
				}

				locals.archives = results;
				next();
			})
    });    
};
