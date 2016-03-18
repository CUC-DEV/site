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

Post.add({
	title: { type: String, required: true, initial:true,label:"题目"},
	rank: { type: Number, default: 0,label:"优先级" },
    createdAt:{ type: Date, default: Date.now,label:"创建时间"},
	publishedAt: Date,
	note:{type:String,  label:"备注"},
	author: {type: String,label:"作者"},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, required:true, initial:true ,label:"状态"},
	isHotNews: { type: Types.Boolean, label:'首页新闻' },
	images: { type: Types.Relationship, ref: 'Image', many: true ,label:"图片"},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true ,label:"所属类别"},
	content: {
		brief: { type: Types.Text,label:"简述"},
		detail: { type: Types.Html, wysiwyg: true,label:"详情"}
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

Post.schema.virtual('image').get(function() {
  return this.images.length ? this.images[0]._.image.src() : null;
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
