var _ = require('underscore');
var keystone = require('keystone');
var member = keystone.list('Member');

exports = module.exports = function (req, res) {
	member.model.findOne({id: req.params.id}).exec(function (err, member) {
		if (member){
			
				res.json({bio: member.bio,weibo:member.weibo});
		}
		else{
			res.json(member);
		}		
		
})}
