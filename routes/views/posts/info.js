var keystone = require('keystone');

exports = module.exports = function(req, res, next) {
    
    var locals = res.locals;

	// Load categories
    var categoryPromise =  keystone.list('PostCategory').model.find().exec();
    //todo: think about pagination querying
    var recentPromise =	keystone.list('Post').model.find({state:"published"}).select('id title').sort({'updatedAt':-1}).limit(5).exec();
    var introPromise = keystone.list('TextData').model.findOne({technicalKey:"post-intro"}).where('state', 'published').select('id title').exec();
    var sloganPromise = keystone.list('TextData').model.findOne({technicalKey:"post-slogan"}).where('state', 'published').exec();

    Promise.all([categoryPromise, recentPromise, introPromise, sloganPromise]).then(function(values){
        locals.categories = values[0];
        locals.recent = values[1];
        locals.intro = values[2];
        locals.slogan = values[3];
        next()
    });

	// can't load archived posts by year with promise
    /*
	var archivePromise = keystone.list('Post').model.aggregate([
			{$match:{state:"published", publishDate:{$exists:true}}},
			{ $group: { _id: { $year: "$publishDate" }, total: { $sum: 1 } } },
			{ $sort: { total: -1 }  }], function(err, results){
				if(err){
					console.log("cant't aggregate post");
					return next(err);
				}

				console.log('archive'+results[0]);
				locals.archives = results;
			});

    */
};