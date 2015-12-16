var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Members Model
 * ===========
 */

var Member = new keystone.List('Member', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true },
	label:"成员"
});

Member.add({
	name: { type: Types.Name, required: true, index: true ,label:"姓名"},
	email: { type: Types.Email, initial: true, index: true },
}, 'Profile', {
    photo: { type: Types.Relationship, ref: 'Image', many: false ,label:"照片"},
		weibo: { type: String, width: 'short',label:"微博"},
		website: { type: Types.Url,label:"个人网站" },
		bio: { type: Types.Markdown,label:"个人简历" },
		type: {type: Types.Select, options: 'student, teacher', default: 'student',label:"身份"},
		graduatedDate: { type: Types.Date ,label:"毕业时间"},
		desciption:  { type: Types.Textarea ,label:"个人描述"},
		Achievements: { type: Types.Relationship, ref: 'Achievement', many: true ,label:"获奖情况"}
	});


/**
 * Registration
 * ============
*/

Member.defaultColumns = 'name, email, type';
Member.register();
