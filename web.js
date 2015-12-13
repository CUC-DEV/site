// Load .env for development environments
require('dotenv').load();
var keystone = require('keystone');
var pkg = require('./package.json');
keystone.init({
    'name': '中国传媒大学智能媒体计算实验室',
    'brand': 'imc后台',
    'favicon': 'public/favicon.ico',
    'less': 'public',
    'static': ['public', process.env.DATA_PATH],

    'views': 'templates/views',
    'view engine': 'jade',
    'auto update': true,
    'mongo': process.env.MONGO_URI || 'mongodb://localhost/lab-dev',
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': '(your secret here)',
  
});
 
keystone.import('models');

keystone.set('nav', {
    '用户': 'users',
    '新闻': ['posts', 'post-categories'],
    '研究': ['researches','research-categories'],
    '成员': 'members',
    '图片': 'images',
    '资源': 'resources',
    '文本': 'text-data'
});

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