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
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label:"状态" },
	progress:{type: Types.Select, options: 'to_do, doing, done', default: 'to_do', index: true, label:"进度"},
	leader: { type: Types.Relationship, ref: 'Member', index: true, many:false },
    authors: {type: Types.Relationship, ref: 'Member', index: true, many:true },
    publishedAt: { type: Types.Date, index: true },
	begin: Date,
    end: Date,
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
		brief: { type: Types.Markdown, wysiwyg: true, height: 150 },
		main: { type: Types.Markdown, wysiwyg: true, height: 400 }
	},
	process:{type: String, required: true,default:'0%'},
	demo: { type: Types.Url },
	categories: { type: Types.Relationship, ref: 'ResearchCategory', many: true }
});

/**
 * Virtuals
 * ========
 */

Research.schema.virtual('url').get(function() {
	return "/researches/"+this.id;
});

Research.schema.virtual('name').get(function() {
    return this.title;
});


/**
 * Middleware
 * ========
 */


Research.schema.pre('save', function(next) {
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

Research.defaultSort = '-publishedDate';
Research.defaultColumns = 'title, state|20%, responsable|20%, publishedDate|20%';
Research.register();
