var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Posts Model
 * ===========
 */

var Post = new keystone.List('Post', {
	track: true,
	defaultSort: '-createdAt',
    label: '新闻',
    map:{name:'title'}
});
//todo: when publish save pushlish date
Post.add({
	title: { type: String, required: true, initial:true},
	rank: { type: Number, default: 0 },
    createdAt:{ type: Date, default: Date.now},
	publishedAt: Date,
	note:{type:String,  label:"备注"},
	author: {type: String},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, required:true, initial:true },
	isHotNews: { type: Types.Boolean, label:'首页新闻' },
	images: { type: Types.Relationship, ref: 'Image', many: true },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
	content: {
		brief: { type: Types.Text},
		detail: { type: Types.Html, wysiwyg: true}
	}
});

/**
 * Virtuals
 * ========
 */

Post.schema.virtual('url').get(function() {
	return "/posts/"+this.id;
});

Post.schema.virtual('name').get(function() {
    return this.title;
});

/**
 * Middleware
 * ========
 */


Post.schema.pre('save', function(next) {
    if(this.state === 'published'){
        if(!this.publishedAt)
        {
            this.publishedAt = Date.now();
        }
    }else{
        this.publishedAt = null;
    }
    next();
});

/**
 * Registration
 * ============
 */

Post.defaultSort = '-publishDate';
Post.defaultColumns = 'title, state|20%, author|20%, publishedAt|20%';
Post.register();
