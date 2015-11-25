var _ = require('underscore');
var keystone = require('keystone');
var PostCategory = keystone.list('PostCategory');

exports = module.exports = function (req, res) {
	PostCategory.model.findOne({ name: req.params.name }).exec(function (err, postCategory) {
		if (postCategory) {
			postCategory.populateRelated('posts', function (err) {
				// posts is populated, and each author on each post is populated
				console.log("posts by catogory name" + postCategory);
				postCategory.add = "add";
				res.json({count: postCategory.posts.length});
			});
		}else{
			res.json(postCategory);
		}
	});
}
