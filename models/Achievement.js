// Load .env for development environments
require('dotenv').load();
var data_path = process.env.DATA_PATH || (__dirname + '/data');

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Achievement Model
 * =====================
 */

var Achievement = new keystone.List('Achievement', {
	track: true,
	autokey: { path: 'key', from: 'title', unique: true }
});

Achievement.add({
	title: { type: String, required: true, initial: true },
	type: {type: Types.Select, options: 'code, pdf, link', default: 'pdf'},
	link:{ type: Types.Url },
	file: {
		type: Types.LocalFile,
		dest: data_path + '/achievement',
		prefix: '/files/',
		filename: function (item, file) {
			return item.id + '.' + file.extension
		}
	},
});


/**
 * Relationships
 * =============
 */

Achievement.relationship({ ref: 'Member', refPath: 'achievements', path: 'members' });


/**
 * Registration
 * ============
 */

Achievement.register();
