var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var ObjectId = require('mongodb').ObjectID;

var courses = [
    {
        courseNum: 1000,
        name: '计算机简史'
    },
    {
        courseNum: 1001,
        name: '计算机应用数学'
    }
];

var url = 'mongodb://localhost:27017/education';


/* GET home page. */
router.get('/api', function (req, res, next) {
    res.render('index', {title: 'Express'});
});








/************************************************************************************/

/*
课程相关
 */




//查询所有的课程
var findAllCourse = function (fn) {
    MongoClient.connect(url, function (err, db) {
        console.log('connect correct to server');
        var collection = db.collection('course');

        collection.find({}).toArray(function (err, docs) {
            fn(err, docs);
            console.log(docs);
            console.log("Found the following records");
            db.close();
        });
    });
}



//插入课程的方法
var insertCourse = function (course, fn) {
    MongoClient.connect(url, function (err, db) {
        console.log('Connected correctly to server');
        var collection = db.collection('course');
        collection.insertOne(course, function (err) {
            fn(err);
            db.close();

        });
    });
}




//搜索课程
var searchCourse = function (keyword,fn) {
    MongoClient.connect(url, function (err, db) {
        console.log('connect correct to server');
        var collection = db.collection('course');

        collection.find({$or :[{name: new RegExp(keyword)},{number: new RegExp(keyword)},{details: new RegExp(keyword)},{state: new RegExp(keyword)},{major: new RegExp(keyword)}]}).toArray(function (err, docs) {
            fn(err, docs);
            console.log(docs);
            console.log("Found the following records");
            db.close();
        });
    });
}



//修改课程
var updateCourse = function(id,course,fn){
    MongoClient.connect(url, function (err, db) {
        console.log('Connected correctly to server');
        var collection = db.collection('course');
        collection.updateOne({"_id" : ObjectId(id)},{$set :{name:course.name,number:course.number,details:course.details,
            state:course.state,major:course.major}}, function (err) {
            fn(err);
            db.close();

        });
    });
}


//删除课程
var deleteCourse = function(id,fn){
    MongoClient.connect(url, function (err, db) {
    console.log('Connected correctly to server');
    var collection = db.collection('course');
    collection.removeOne({"_id" : ObjectId(id)}, function (err) {
        fn(err);
        db.close();

    });
});
}

router.route('/api/addcourse')
    .get(function(req,res){
        findAllCourse(function(err,docs){
            console.log(docs);
            if(err){
                res.status(500).end();
            }
            res.json(docs);
        })
    })
    .post(function(req,res){

        console.log('add course server');
        var course = {
            name : req.body.name,
            number:req.body.number,
            details : req.body.details,
            state : req.body.state,
            major : req.body.major
        }

        insertCourse(course,function(err){
            if(err){
                res.status(500).end();
            }
        });
    });


router.route('/api/course')
    .get(function (req, res) {

        findAllCourse(function (err, docs) {
            if (err) {
                res.status(500).end();
            }
            //console.log(docs);
            res.json(docs);
        });
    })

    .post(function (req, res) {
        var course = {
            name: req.body.name,
            courseNum: req.body.courseNum
        }
        insertCourse(course, function (err) {
            if (err) {
                res.status(500).end();
            }
        });
    });


//搜索课程
router.route('/api/searchcourse')
    .get(function (req, res) {
        searchCourse(req.query.keyword, function (err, docs) {
            if (err) {
                res.status(500).end();
            }
            res.json(docs);
        });

    });


router.route('/api/editCourse/:id')
    .put(function(req,res){
        console.log(req.params.id);
        var course = {
            number: req.body.number,
            name: req.body.name,
            details: req.body.details,
            state: req.body.state,
            major: req.body.major
        }
        updateCourse(req.params.id,course,function(err){
            if(err) {
                res.status(500).end();
            }

            res.json('edit success');
        });

    });


//删除课程

router.route('/api/deleteCourse/:id')
    .delete(function(req,res){
        deleteCourse(req.params.id,function(err){
            if(err){
                res.status(500).end();
            }

            res.json('delete success');
        });
    });

/************************************************************************************/


module.exports = router;
