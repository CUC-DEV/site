var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Members Model
 * ===========
 */

var Member = new keystone.List('Member', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Member.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, index: true },
}, 'Profile', {
	photo: { type: Types.Relationship, ref: 'Image', many: false },
		weibo: { type: String, width: 'short' },
		website: { type: Types.Url },
		bio: { type: Types.Markdown },
		type: {type: Types.Select, options: 'student, teacher', default: 'student'},
		yearGraduated: { type: Types.Number },
		dessciption:  { type: Types.Textarea },
		Achievements: { type: Types.Relationship, ref: 'Achievement', many: true }
	});


/**
 * Registration
 * ============
*/

Member.defaultColumns = 'name, email, type';
Member.register();
