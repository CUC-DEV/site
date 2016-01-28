var keystone = require('keystone');

exports = module.exports = function(req, res, next) {

    var locals = res.locals;
    if(locals.page.name ==="keystone") next();

    var introPromise = keystone.list('TextData').model.findOne({technicalKey: locals.page.name + "-intro"}).where('state', 'published').exec();
    var sloganPromise = keystone.list('TextData').model.findOne({technicalKey: locals.page.name + "-slogan"}).where('state', 'published').exec();

    Promise.all([introPromise, sloganPromise]).then(function(values){
        locals.intro = values[0];
        locals.slogan = values[1];

        next();
    });
};