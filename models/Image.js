// Load .env for development environments
require('dotenv').load();
var data_path = process.env.DATA_PATH || (__dirname + '/data');

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Research Model
 * ===========
 */

var Image = new keystone.List('Image', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Image.add({
	name: { type: String, required: true, initial: true },
	date: { type: Types.Datetime, default: Date.now },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	type: { type: Types.Select, options: 'post, reseach, member, resource, avtivity', default: 'post', index: true },
	brief: { type: Types.Text, wysiwyg: true, height: 150 },
	image: {
		type: Types.LocalFile,
		dest: data_path + '/images',
		prefix: '/images/',
		format: function(item, file){
			return '<img src="/images/'+file.filename+'" style="max-width: 300px">'
		}
	}
});

/**
 * Relationships
 * =============
 */

Image.relationship({ ref: 'Post', refPath: 'images', path: 'posts' });
Image.relationship({ ref: 'Member', refPath: 'photo', path: 'memebers' });
Image.relationship({ ref: 'Research', refPath: 'images', path: 'researches' });

/**
 * Registration
 * ============
 */

Image.defaultSort = '-date';
Image.defaultColumns = 'title, state|20%, date, type|20%';
Image.register();
