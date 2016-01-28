// Load .env for development environments
require('dotenv').load();
var data_path = process.env.DATA_PATH || (__dirname + '/data');

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Paper Model
 * ===========
 */

var Paper = new keystone.List('Paper', {
	track: true,
	defaultSort: '-createdAt',
    label: '论文',
    map:{name:'title'}
});

Paper.add({
	title: { type: String, required: true, initial:true,label:"题目"},
    createdAt:{ type: Date, default: Date.now,label:"创建时间"},
	author: {type: String,label:"作者"},
	content: {type: Types.Html, wysiwyg: true,label:"内容"},
	file: {
		type: Types.LocalFile,
		dest: data_path + '/paper',
		prefix: '/files/',
		filename: function (item, file) {
			return item.id + '.' + file.extension
		},
		label:"上传文件"
	},
});

/**
 * Virtuals
 * ========
 */

Paper.schema.virtual('url').get(function() {
	return "/paper/"+this.id;
});

Paper.schema.virtual('name').get(function() {
    return this.title;
});



/**
 * Registration
 * ============
 */

Paper.register();
