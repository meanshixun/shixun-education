/**
 * Created by xiner on 7/7/15.
 */
var education = angular.module('demo', ['ui.bootstrap','ui.router']);

education.controller('NavController', function ($location) {

    var acc = this;
    acc.oneAtATime = true;


    this.groups = [
        {
            title: '科目',
            imageUrl:'/images/managesubject.png',
            active:true,
            statename:'course',
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
                    statename:'infomanage',

                    name:'基本信息管理'
                },
                {
                    imageUrl:'/images/icon.png',
                    active:false,
                    statename:'rowclass',
                    Url:'#/schedule/rowclass',
                    name:'排课'
                },
                {
                    imageUrl:'/images/calender.png',
                    active:false,
                    statename:'signup',
                    Url:'#/schedule/enroll',
                    name:'报名'
                },
                {
                    imageUrl:'/images/icon.png',
                    active:false,
                    statename:'sign',

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
                    statename:'exam',
                    Url:'#/exam/exammanage',
                    active : true

                },
                {
                    imageUrl: '/images/icon.png',
                    name: '成绩管理',
                    statename:'score',
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
            statename:'lookup',
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



education.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('signup',{
        url:'/schedule/enroll',
        templateUrl : '/schedule/scheduleenroll.html',
        //controller : 'schedulenrollController'
    }).state('infomanage',{
        url:'/schedule/info',
        templateUrl:'/schedule/scheduleinfo.html',
        //controller :'scheduleinfoController'
    }).state('rowclass',{
        url:'/schedule/rowclass',
        templateUrl :'/schedule/schedulerowclass.html',
        //controller : 'schedulerowclassController'
    }).state('sign',{
        url:'/schedule/sign',
        templateUrl:'/schedule/schedulesign.html',
        //controller: 'schedulesignController'
    }).state('exam',{
        url:'/exam/exammanage',
        templateUrl : '/exam/exammanage.html',
        //controller :'exammanageController'
    }).state('score',{
        url:'/exam/score',
        templateUrl:'/exam/scoremanage.html',
        //controller:'scoreController'
    }).state('course',{
        url:'/',
        templateUrl :'/course/course.html',
        controller:'CourseController',
        controllerAs: 'cou'
    //}).when('/search',{
    //    templateUrl : '/search/search.html',
    //    controller : 'SearchController',
    //    controllerAs : 'search'
    })
    ;
});


