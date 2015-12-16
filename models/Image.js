// Load .env for development environments
require('dotenv').load();
var data_path = process.env.DATA_PATH

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Research Model
 * ===========
 */

var Image = new keystone.List('Image', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true },
	label:"图片"
});

Image.add({
	name: { type: String, required: true, initial: true,label:"图片标题" },
	date: { type: Types.Datetime, default: Date.now,label:"上传时间"},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true ,label:"状态" },
	type: { type: Types.Select, options: 'post, reseach, member, resource, avtivity', default: 'post', index: true ,label:"归属类别" },
	brief: { type: Types.Text, wysiwyg: true, height: 150 ,label:"简述" },
	image: {
		type: Types.LocalFile,
		dest: data_path + '/img',
		prefix: '/img/',
		format: function(item, file){
			return '<img src="/img/'+file.filename+'" style="max-width: 300px">'
		}
	,label:"上传图片" }
});

/**
 * Relationships
 * =============
 */

Image.relationship({ ref: 'Post', refPath: 'images', path: 'posts' });
Image.relationship({ ref: 'Member', refPath: 'photo', path: 'members' });
Image.relationship({ ref: 'Research', refPath: 'images', path: 'researches' });

/**
 * Registration
 * ============
 */

Image.defaultSort = '-date';
Image.defaultColumns = 'name, date, type|20%, state|20%';
Image.register();
