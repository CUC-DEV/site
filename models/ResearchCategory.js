var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Categories Model
 * =====================
 */

var ResearchCategory = new keystone.List('ResearchCategory', {
	track: true,
	autokey: { from: 'name', path: 'key', unique: true }
});

ResearchCategory.add({
	name: { type: String, required: true },
	label: {type: String, required: true, initial:true}
});


/**
 * Relationships
 * =============
 */

ResearchCategory.relationship({ ref: 'Research', refPath: 'categories', path: 'researches' });


/**
 * Registration
 * ============
 */

ResearchCategory.register();
