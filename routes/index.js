var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);
 
// 常用中间件
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
 
// 处理404错误
keystone.set('404', function(req, res, next) {
    res.notfound();
});
 
// 处理其它错误
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});
 
// 加载路由
var routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
};
 
// 绑定路由
exports = module.exports = function(app) {
    app.use(routes.views.skeleton);
    app.get('/', routes.views.home);
    app.get('/home', routes.views.home);
    app.use('/posts',routes.views.posts.info);
    app.get('/posts', routes.views.posts.index);
    app.get('/posts/:id', routes.views.posts.post);
    app.get('/posts/categories/:id', routes.views.posts.category);
    app.get('/posts/year/:year', routes.views.posts.year);
    app.use('/researches', routes.views.researches.info);
    app.get('/researches', routes.views.researches.index);
    app.get('/researches/:id', routes.views.researches.research);    
    app.get('/researches/categories/:id', routes.views.researches.category);
    app.get('/researches/year/:year', routes.views.researches.year);
    app.get('/researches/progress/:progress', routes.views.researches.progress);
    //app.get('/researches/detail/:id', routes.views.researchdetail);
    //app.get('/researches/:item/:name', routes.views.researchcategory);
    app.get('/members', routes.views.members);
    app.get('/resources', routes.views.resources);
    app.get('/activities', routes.views.activities);
    //app.get('/contact', routes.views.contact);
    app.get('/api/category/:name', routes.api.postCategory);
    app.get('/api/member/:id', routes.api.member);

}