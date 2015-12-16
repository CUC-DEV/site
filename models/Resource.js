var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Research Model
 * ===========
 */

var Resource = new keystone.List('Resource', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'key', from: 'title', unique: true },
	label:"资源"
});

Resource.add({
	title: { type: String, required: true },
	rank: {type: Number},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true },
	year: {type: Number},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		main: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	categories: { type: Types.Relationship, ref: 'ResourceCategory', many: true }
});


/**
 * Registration
 * ============
 */

Resource.defaultSort = '-publishedDate';
Resource.defaultColumns = 'title, state|20%, year, publishedDate|20%';
Resource.register();
