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
	key: { type: String, required: true, initial:true,label:"类别英文名称"},
	name: {type: String, required: true, initial:true,label:"类别中文名称"}
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
