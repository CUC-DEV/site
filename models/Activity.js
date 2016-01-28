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
	autokey: { path: 'key', from: 'title', unique: true },
	label:"活动"
});

Activity.add({
	title: { type: String, required: true,label:"标题"},
	rank: {type: Number,label:"优先级"},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true,label:"状态"},
	publishedDate: { type: Types.Date, index: true,label:"发布时间"},
	year: {type: Number,label:"年份"},
	photo: { type: Types.Relationship, ref: 'Image', many: false,label:"照片"},
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150,label:"简述"},
		main: { type: Types.Html, wysiwyg: true, height: 400,label:"详情"}
	}
});


/**
 * Registration
 * ============
 */

Activity.defaultSort = '-publishedDate';
Activity.defaultColumns = 'title, state|20%, publishedDate|20%';
Activity.register();
