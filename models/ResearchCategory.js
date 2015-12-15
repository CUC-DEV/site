var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Categories Model
 * =====================
 */

var ResearchCategory = new keystone.List('ResearchCategory', {
	track: true,
	label:'研究成果类别',
    map:{name:'name'}
});

ResearchCategory.add({
	key: { type: String, required: true, initial:true },
	name: {type: String, required: true, initial:true}
});


/**
 * Virtuals
 * ========
 */

ResearchCategory.schema.virtual('url').get(function() {
	return "/researches/categories/"+this.id;
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
