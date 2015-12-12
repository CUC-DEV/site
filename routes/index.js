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
    ajaxs: importRoutes('./ajaxs')
};
 
// 绑定路由
exports = module.exports = function(app) {
    app.get('/', routes.views.home);

    app.get('/posts', routes.views.posts);
    app.get('/posts/:title',routes.views.homepost);
    app.get('/researches', routes.views.researches);
    //研究成果详情页面
    app.get('/researches/detail/:id', routes.views.researchdetail);    
    //研究成果筛选页面
    app.get('/researches/:item/:name', routes.views.researchcategory);
    app.get('/members', routes.views.members);
    app.get('/resources', routes.views.resources);
    app.get('/activities', routes.views.activities);
    //app.get('/contact', routes.views.contact);
    app.get('/ajax/category/:name', routes.ajaxs.postCategory);
    app.get('/ajax/member/:id', routes.ajaxs.member);

}