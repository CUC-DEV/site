var keystone = require('keystone'),
    User = keystone.list('User'),
    TextData = keystone.list('TextData');

exports = module.exports = function (done) {
    new User.model({
        name: { first: 'Admin', last: 'User' },
        email: 'admin@dev.com',
        password: 'admin',
        isAdmin: true
    }).save();

    new TextData.model({
        title: '智能媒体计算实验室',
        content: { "brief": "智能媒体实验室", "detail": "<p>实验室以实现高度智能化的多媒体感知系统为目标，面向国民经济和社会发展重要需求，开展计算机视觉、机器学习、人机交互技术、移动终端技术、数据挖掘和知识发现等方面的基础和应用基础研究。</p>\n<p>研究团队理念：踏应用实地，攀学术高峰</p>\n", "md": "实验室以实现高度智能化的多媒体感知系统为目标，面向国民经济和社会发展重要需求，开展计算机视觉、机器学习、人机交互技术、移动终端技术、数据挖掘和知识发现等方面的基础和应用基础研究。\r\n\r\n研究团队理念：踏应用实地，攀学术高峰" },
        "technicalKey" : "home-intro", "state" : "published"
    }).save();
    
    new TextData.model({
        title: '首页标语',
        "content" : { "brief" : "", "detail" : "<h2>Texts, images, videos, we process everything.</h2>\n", "md" : "## Texts, images, videos, we process everything."},
        "technicalKey" : "home-slogan",
        "state" : "published"
    }).save();

    new TextData.model({
        title: '新闻',
        content: { "brief": "智能媒体实验室", "detail": "<p>实验室以实现高度智能化的多媒体感知系统为目标，面向国民经济和社会发展重要需求，开展计算机视觉、机器学习、人机交互技术、移动终端技术、数据挖掘和知识发现等方面的基础和应用基础研究。</p>\n<p>研究团队理念：踏应用实地，攀学术高峰</p>\n", "md": "实验室以实现高度智能化的多媒体感知系统为目标，面向国民经济和社会发展重要需求，开展计算机视觉、机器学习、人机交互技术、移动终端技术、数据挖掘和知识发现等方面的基础和应用基础研究。\r\n\r\n研究团队理念：踏应用实地，攀学术高峰" },
        "technicalKey" : "post-intro", "state" : "published"
    }).save();

    new TextData.model({
        title: '新闻口号',
        "content" : { "brief" : "", "detail" : "<h2>Texts, images, videos, we process everything.</h2>\n", "md" : "## Texts, images, videos, we process everything."},
        "technicalKey" : "post-slogan",
        "state" : "published"
    }).save();

    new TextData.model({
        title: '新闻',
        content: { "brief": "智能媒体实验室", "detail": "<p>实验室以实现高度智能化的多媒体感知系统为目标，面向国民经济和社会发展重要需求，开展计算机视觉、机器学习、人机交互技术、移动终端技术、数据挖掘和知识发现等方面的基础和应用基础研究。</p>\n<p>研究团队理念：踏应用实地，攀学术高峰</p>\n", "md": "实验室以实现高度智能化的多媒体感知系统为目标，面向国民经济和社会发展重要需求，开展计算机视觉、机器学习、人机交互技术、移动终端技术、数据挖掘和知识发现等方面的基础和应用基础研究。\r\n\r\n研究团队理念：踏应用实地，攀学术高峰" },
        "technicalKey" : "research-intro", "state" : "published"
    }).save();

    new TextData.model({
        title: '新闻口号',
        "content" : { "brief" : "", "detail" : "<h2>Texts, images, videos, we process everything.</h2>\n", "md" : "## Texts, images, videos, we process everything."},
        "technicalKey" : "research-slogan",
        "state" : "published"
    }).save();
    
    done();

};