var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Users Model
 * ===========
 */

var User = new keystone.List('User', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true },
    label: '用户',
    map:'name'
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, index: true },
	password: { type: Types.Password, initial: true },
	isAdmin: { type: Boolean, label: 'Can Admin SydJS' }
});


// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Registration
 * ============
*/

User.defaultColumns = 'name, email, isAdmin';
User.register();
