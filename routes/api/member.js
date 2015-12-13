var _ = require('underscore');
var keystone = require('keystone');
var Member = keystone.list('Member');

exports = module.exports = function (req, res) {
	var id = req.params.id;
	Member.model.findOne({_id: id}).exec(function (err, member) {
		if (err || !member){
			console.log('err when ajax member with id ' + id);
			res.json({status:'err'})
		}
	//可以添加更多的信息,暂时只返回bio作为示例
		res.json({status:'ok',data:{bio:member.bio,weibo:member.weibo,mem:member.name,website:member.website}});
	});
}
