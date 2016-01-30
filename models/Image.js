// Load .env for development environments
require('dotenv').load();
var profile = process.env.PROFILE || 'dev';

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
		type: Types.CloudinaryImage,
        autoCleanup : true,
        folder: profile,
	}
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
