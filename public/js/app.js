/**
 * Created by xiner on 7/7/15.
 */
var education = angular.module('demo', ['ui.bootstrap','ngRoute']);

education.controller('NavController', function ($location) {

    var acc = this;
    acc.oneAtATime = true;


    this.groups = [
        {
            title: '科目',
            imageUrl:'/images/managesubject.png',
            active:true,
            Url:'/',
            subtitle:[
                ]

        },
        {
            title: '班期',
            imageUrl:'/images/manageschedule.png',
            active :false,
            subtitle:[
                {
                    imageUrl:'/images/calender.png',
                    active:true,
                    Url:'#/schedule/info',
                     name:'基本信息管理'
                },
                {
                    imageUrl:'/images/icon.png',
                    active:false,
                    Url:'#/schedule/rowclass',
                    name:'排课'
                },
                {
                    imageUrl:'/images/calender.png',
                    active:false,
                    Url:'#/schedule/enroll',
                    name:'报名'
                },
                {
                    imageUrl:'/images/icon.png',
                    active:false,
                    Url:'#/schedule/sign',
                    name:'签到'
                }
            ]

        },
        {
            title: '考核',
            imageUrl:'/images/manageperson.png',
            active:false,
            subtitle:[
                {
                    imageUrl:'/images/calender.png',
                    name:'考核管理',
                    Url:'#/exam/exammanage',
                    active : true

                },
                {
                    imageUrl: '/images/icon.png',
                    name: '成绩管理',
                    Url:'#/exam/score',
                    active:false
                }
            ]
        },
        {
            title: '查询',
            imageUrl:'/images/managesubject.png',
            active:false,
            Url:'/search',
            subtitle:[
        ]

    },
    ];




    this.current = this.groups[0];
    this.currentSub = this.current.subtitle[0];
    this.active = active;
    this.activeSub = activeSub;

    function active(group){
        acc.current.active = false;
        acc.current = group;
        acc.current.active = true;
        acc.activeSub(acc.current.subtitle[0]);
        if(angular.isDefined(group.Url)){
            $location.url(group.Url);
        }


    }

    function activeSub(subTitle){
        if(angular.isDefined(subTitle) && angular.isDefined(acc.currentSub)) {
            acc.currentSub.active = false;
            acc.currentSub = subTitle;
            acc.currentSub.active = true;
        }
    }
});



education.config(function($routeProvider){

    $routeProvider.when('/schedule/enroll',{
        templateUrl : '/schedule/scheduleenroll.html',
        //controller : 'schedulenrollController'
    }).when('/schedule/info',{
        templateUrl:'/schedule/scheduleinfo.html',
        //controller :'scheduleinfoController'
    }).when('/schedule/rowclass',{
        templateUrl :'/schedule/schedulerowclass.html',
        //controller : 'schedulerowclassController'
    }).when('/schedule/sign',{
        templateUrl:'/schedule/schedulesign.html',
        //controller: 'schedulesignController'
    }).when('/exam/exammanage',{
        templateUrl : '/exam/exammanage.html',
        //controller :'exammanageController'
    }).when('/exam/score',{
        templateUrl:'/exam/scoremanage.html',
        //controller:'scoreController'
    }).when('/',{
        templateUrl :'/course/course.html',
        controller:'CourseController',
        controllerAs: 'cou'
    }).when('/search',{
        templateUrl : '/search/search.html',
        controller : 'SearchController',
        controllerAs : 'search'
    })
    ;
});


