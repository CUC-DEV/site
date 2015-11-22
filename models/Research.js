// Load .env for development environments
require('dotenv').load();
var data_path = process.env.DATA_PATH || (__dirname + '/data');

var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Research Model
 * ===========
 */

var Research = new keystone.List('Research', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'key', from: 'title', unique: true }
});

Research.add({
	title: { type: String, required: true },
	rank: { type: Number, default: 0 },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	responsable: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	year: { type: Number },
	video: {
		type: Types.LocalFile,
		dest: data_path + '/research',
		prefix: '/files/',
		filename: function (item, file) {
			return item.id + '.' + file.extension
		}
	},
	images: { type: Types.Relationship, ref: 'Image', many: true },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		main: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	demo: { type: Types.Url },
	categories: { type: Types.Relationship, ref: 'Category', many: true }
});


/**
 * Registration
 * ============
 */

Research.defaultSort = '-publishedDate';
Research.defaultColumns = 'title, state|20%, responsable|20%, publishedDate|20%';
Research.register();
