var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TextData Model
 * ===========
 */

var TextData = new keystone.List('TextData', {
	track: true,
	defaultSort: '-createdAt',
    map: { name: 'title' },
	label:"文本信息"
});

TextData.add({
	title: { type: String, required: true, initial:true},
	note:{type:String,  label:"备注"},
	technicalKey:{type:String,  label:"技术参数"},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, required:true, initial:true },
	content: {
		brief: { type: Types.Text},
		detail: { type: Types.Html, wysiwyg: true}
	}
});


/**
 * Registration
 * ============
 */

TextData.defaultSort = '-publishDate';
TextData.defaultColumns = 'title, state|20%';
TextData.register();
