var keystone = require('keystone');

exports = module.exports = function(req, res, next) {
    
    var locals = res.locals;
	// Load categories
    var categoryPromise =  keystone.list('PostCategory').model.find().exec();
    //todo: think about pagination querying
    var recentPromise =	keystone.list('Post').model.find({state:"published"}).select('id title').sort({'updatedAt':-1}).limit(5).exec();

    Promise.all([categoryPromise, recentPromise]).then(function(values){
        locals.categories = values[0];
        locals.recent = values[1];

        // can't load archived posts by year with promise
        keystone.list('Post').model.aggregate([
            {$match:{state:"published", publishedAt:{$exists:true}}},
            {$project: { year : { $dateToString: { format: "%Y", date: "$publishedAt" }}}},
            { $group: { _id: '$year' , total: { $sum: 1 }}},
            { $project:{name: '$_id', total:'$total', url: { $concat: [ '/posts/year/', '$_id']}}},
            { $sort: { name: -1 } }], function(err, results){

            if(err){
                console.log("cant't aggregate post");
                return next(err);
            }

            locals.archives = results;
            next()
        });

    });
};