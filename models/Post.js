var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Posts Model
 * ===========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	track: true,
	autokey: { path: 'key', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	rank: { type: Number, default: 0 },
	publishDate: Date,
	author: {type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	type: { type: Types.Select, options: 'home, post, other', default: 'post', index: true },
	images: { type: Types.Relationship, ref: 'Image', many: true },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	content: {
		brief: { type: Types.Text},
		extended: { type: Types.Markdown}
	}
});

/**
 * Virtuals
 * ========
 */

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});


/**
 * Registration
 * ============
 */

Post.defaultSort = '-publishedDate';
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
