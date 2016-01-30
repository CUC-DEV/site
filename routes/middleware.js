var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');


/**
	Initialises the standard view locals
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: '主页',		key: 'home',		href: '/' },
		{ label: '新闻',		key: 'post',		href: '/posts' },
		{ label: '研究成果',		key: 'researches',		href: '/researches' },
		{ label: '论文',		key:'paper',		href:'/paper'},
		{ label: '成员信息',		key: 'members',		href: '/members' },
		{ label: '资源共享',		key: 'resources',		href: '/resources' },
		{ label: '课外活动',		key: 'activities',		href: '#' },
		{ label: '联系我们',		key: 'contact',		href: '#' }
	];

	var pages = req.url.split('/').filter(function(page){
		return page;
	}),
	pageName = 'home';

	if(pages.length){
		pageName = pages[0];
	}

	locals.pageName = pageName;

	locals.user = req.user;
	
	locals.imgPrefix = '/img/';
    locals.paperPrefix = '/paper/';
	locals.basedir = keystone.get('basedir');
	
	locals.page = {
		title: '智能媒体计算实验室',
		path: req.url.split("?")[0], // strip the query - handy for redirecting back to the page
		name: pageName
	};
	
	locals.qs_set = qs_set(req, res);
	
	if (req.cookies.target && req.cookies.target == locals.page.path) res.clearCookie('target');
	
	next();
	
};



/**
	Inits the error handler functions into `req`
*/

exports.initErrorHandlers = function(req, res, next) {
	
	res.err = function(err, title, message) {
		res.status(500).render('errors/500', {
			err: err,
			errorTitle: title,
			errorMsg: message
		});
	}
	
	res.notfound = function(title, message) {
		res.status(404).render('errors/404', {
			errorTitle: title,
			errorMsg: message
		});
	}
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
	
	next();
	
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/signin');
	} else {
		next();
	}
	
}

/**
	Prevents people from accessing the site while it's been updated
 */

exports.restrictSite = function(req, res, next) {
	
	if (!req.user) {
		if (req.url != '/maintenance') return res.redirect('/maintenance');
		next();
	} else {
		next();
	}
	
}

/**
	Returns a closure that can be used within views to change a parameter in the query string
	while preserving the rest.
*/

var qs_set = exports.qs_set = function(req, res) {

	return function qs_set(obj) {

		var params = _.clone(req.query);

		for (var i in obj) {
			if (obj[i] === undefined || obj[i] === null) {
				delete params[i];
			} else if (obj.hasOwnProperty(i)) {
				params[i] = obj[i];
			}
		}

		var qs = querystring.stringify(params);

		return req.path + (qs ? '?' + qs : '');

	}

}
