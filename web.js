// Load .env for development environments
require('dotenv').load();
var data_path = __dirname + (process.env.DATA_PATH || '/data');
var keystone = require('keystone');
var pkg = require('./package.json');
keystone.init({
  
  'name': 'My Project',
  
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public', data_path],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': process.env.MONGO_URI || 'mongodb://localhost/lab-dev',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)'
  
});
 
keystone.import('models');
 
keystone.set('routes', require('./routes'));

keystone.set('locals', {
	_: require('underscore'),
	moment: require('moment'),
	js: 'javascript:;',
	env: keystone.get('env'),
	utils: keystone.utils,
	plural: keystone.utils.plural,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});
 
keystone.start();