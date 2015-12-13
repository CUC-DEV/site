var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Categories Model
 * =====================
 */

var PostCategory = new keystone.List('PostCategory', {
	track: true,
	label: '新闻类别',
    map:{name:'name'}
});

PostCategory.add({
	key: { type: String, required: true, initial:true },
	name: {type: String, required: true, initial:true}
});

/**
 * Virtuals
 * ========
 */

PostCategory.schema.virtual('url').get(function() {
	return "/posts/categories/"+this.id;
});

/**
 * Relationships
 * =============
 */

PostCategory.relationship({ ref: 'Post', refPath: 'categories', path: 'posts' });


/**
 * Registration
 * ============
 */

PostCategory.register();
