var keystone = require('keystone');

exports = module.exports = function(req, res, next) {

    var locals = res.locals,
        pages = req.url.split('/').filter(function(page){
            return page;
        }),
        page = 'home';

    if(pages.length){
        page = pages[0];
    }

    if(page ==="keystone") next();

    var introPromise = keystone.list('TextData').model.findOne({technicalKey: page+"-intro"}).where('state', 'published').exec();
    var sloganPromise = keystone.list('TextData').model.findOne({technicalKey: page+"-slogan"}).where('state', 'published').exec();

    Promise.all([introPromise, sloganPromise]).then(function(values){
        locals.intro = values[0];
        locals.slogan = values[1];

        next();
    });
};