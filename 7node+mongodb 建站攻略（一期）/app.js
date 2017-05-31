/**
 * Created by zproo on 2017/5/24.
 */
var express = require("express");
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var movie = require('./models/movie');
var _ = require('underscore'); // _.extend用新对象里的字段替换老的字段

mongoose.connect('mongodb://localhost:27017/imovie');
console.log('MongoDB connection success!');

// 可以从命令行获取
var port = process.env.PORT || 3000;
var app = express();

// 模板渲染时可以访问locals中的变量
app.locals.moment = require('moment'); // 载入moment模块，格式化日期
app.use(bodyParser.urlencoded());
app.set('views', './views/pages');
app.set('view engine', 'pug');
app.use(serveStatic(path.join(__dirname, "public")));
app.listen(port);

console.log('imovie started on' + port);

// index
app.get('/', function (req, res) {
    movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            title: 'imovie 首页',
            movies: movies
        });

    });

    /*// 伪造数据
    res.render('index', {
        title: 'imovie 首页',
        movies: [{
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }, {
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }, {
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }, {
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }, {
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }, {
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }, {
            title: "加勒比海盗5",
            _id: 1,
            poster: 'https://img3.doubanio.com/view/photo/raw/public/p2459723975.jpg'
        }
        ]
    });*/
});

// detail
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: 'imovie' + movie.title,
            movie: movie
        });
    });

    /*res.render('detail', {
        title: 'imovie 详情页',
        movie: {
            title: '机械战警',
            doctor: '帕迪里亚',
            country: '美国',
            year: 2014,
            flash: 'http://player.youku.com/player.php/sid/XMjU2MzI2OTI0NA==/v.swf',
            summary: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttest' +
            +'testtesttesttesttesttesttesttesttesttesttesttesttesttest' +
            +'testtesttesttesttesttesttesttesttesttesttesttesttesttest',
            language: '英语',
        }
    });*/
});

// admin page后台录入页
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: 'imovie 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

// admin update后台更新页
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        movie.findById(id, function (err, movie) {

            console.log('movie================' + movie);
            res.render('admin', {
                title: 'imovie 后台更新页',
                movie: movie
            });
        });
    }
});

// 后台录入提交页面
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie = null;

    console.log('id=============='+id);

    if (id !== 'undefined' && id !== '') { // 已经存在的电影数据
        console.log('有电影数据');

        movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj); // 用新对象里的字段替换老的字段
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            });
        });
    } else {  // 新加的电影
        console.log('无电影数据');

        _movie = new movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });
        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});

// list 列表页
app.get('/admin/list', function (req, res) {
    movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'imovie 列表页',
            movies: movies
        });
    });
});

// list 删除功能
app.delete('/admin/list', function (req, res) {
    var id = req.query.id; // 通过链接后面加问号传参

    if (id) {
        movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({success: 1});
            }
        });
    }
});