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
	autokey: { path: 'key', from: 'title', unique: true },
	label:'研究成果'
});

Research.add({
	title: { type: String, required: true ,label:"题目"},
	rank: { type: Number, default: 0 ,label:"优先级"},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, label:"状态" },
	progress:{type: Types.Select, options: 'to_do, doing, done', default: 'to_do', index: true, label:"进度"},
	progressbar:{type: String, required: true,default:'0%',label:"完成度"},	
	leader: { type: Types.Relationship, ref: 'Member', index: true, many:false,label:"组长" },
    authors: {type: Types.Relationship, ref: 'Member', index: true, many:true,label:"小组成员"},
    publishedAt: { type: Types.Date, index: true ,label:"发布时间"},
	begin: Date,
    end: Date,
	video: {
		type: Types.LocalFile,
		dest: data_path + '/research',
		prefix: '/files/',
		filename: function (item, file) {
			return item.id + '.' + file.extension
		}
	,label:"视频"},
	images: { type: Types.Relationship, ref: 'Image', many: true,label:"图像"},
	content: {
		brief: { type: Types.Markdown, wysiwyg: true, height: 150 ,label:"简述"},
		main: { type: Types.Markdown, wysiwyg: true, height: 400,label:"详情" }
	},
	demo: { type: Types.Url,label:"示例"},
	categories: { type: Types.Relationship, ref: 'ResearchCategory', many: true ,label:"所属类别"}
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
