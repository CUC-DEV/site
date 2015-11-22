var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Research Model
 * ===========
 */

var Activity = new keystone.List('Activity', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'key', from: 'title', unique: true }
});

Activity.add({
	title: { type: String, required: true },
	rank: {type: Number},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true },
	year: {type: Number},
	photo: { type: Types.Relationship, ref: 'Image', many: false },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		main: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});


/**
 * Registration
 * ============
 */

Activity.defaultSort = '-publishedDate';
Activity.defaultColumns = 'title, state|20%, publishedDate|20%';
Activity.register();
