// Load .env for development environments
require('dotenv').load();
var data_path = process.env.DATA_PATH || (__dirname + '/data');

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Achievement Model
 * =====================
 */

var Achievement = new keystone.List('Achievement', {
	track: true,
	autokey: { path: 'key', from: 'title', unique: true },
	label:"获奖情况",
	map:{name:'title'}
});

Achievement.add({
	title: { type: String, required: true, initial: true,label:"标题" },
	type: {type: Types.Select, options: 'code, pdf, link', default: 'pdf',label:"类型"},
	link:{ type: Types.Url,label:"链接"},
	file: {
		type: Types.LocalFile,
		dest: data_path + '/achievement',
		prefix: '/files/',
		filename: function (item, file) {
			return item.id + '.' + file.extension
		},label:"上传文件"
	},
});


/**
 * Relationships
 * =============
 */

Achievement.relationship({ ref: 'Member', refPath: 'achievements', path: 'members' });


/**
 * Registration
 * ============
 */

Achievement.register();
