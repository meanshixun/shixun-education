
angular
    .module('demo')
    .controller('CourseController', CourseController);

CourseController.$inject = ['$http','$scope'];

/* @ngInject */
function CourseController($http,$scope) {
    var course = this;
    course.content='';
    course.items = [];
    course.filterItem = 'name';
    course.filterName = '';
    $scope.filterObj = {};

    course.add = add;
    course.addmodal=addmodal;
    course.remove = remove;
    course.edit = edit;
    course.save = save;
    course.cancel = cancel;
    course.getDetails=getDetails;
    course.searchCourse = searchCourse;
    course.getCourse = getCourse;
    course.searchItemcourse = [];
    course.saveCourse = saveCourse;
    course.deleteCourse = deleteCourse;


    course.ID ='';


    $scope.$watch('course.filterName', function(oldValue, newValue) {
        $scope.filterObj = {};
        $scope.filterObj[course.filterItem] = course.filterName;
    });
    //init();

    //得到科目的详情
    function getDetails(item){
        course.content=item.details;
        return course.content;
    }





/*
****************************************************************************************************
 */

    getCourse();


    //弹出添加课程的框框
    function addmodal(){
        $('#myModal1').modal();
    }


    //添加课程
    function add() {

        $http.post('/api/addcourse',{
            number:course.number,
            name :course.name,
            details : course.details,
            state : course.state,
            major : course.major
        }).success(function(){
            console.log('add course success');
        });

        getCourse();

        $('#myModal1').modal('hide');
    }

    //得到所有的课程
    function getCourse() {
        $http.get('/api/addcourse')
            .success(function (data) {
                course.items = data;
            }).error(function () {
                console.log('error')
            });
    }



    //关键字搜素课程
    function searchCourse(){
        $http.get('/api/searchcourse',
            {
                params: {
                    keyword: course.keyword,
                }
            }).success(function (data) {
                course.items = data;
            });
    }


    course.id='';

    //编辑数据
    function edit(item) {
        course.ID = item._id;
        var index = 0;
        for (var i = 0; i < item.length; i++) {
            if (course.items[i] == item)
                index = i;
        }
        course.number = item.number;
        course.name = item.name;
        course.details=item.details;
        course.state=item.state;
        course.major=item.major;
        course.index = index;
        $('#myModal').modal();
    }


    //保存编辑数据
    function saveCourse(){
        console.log(course.ID);
        $http.put('/api/editCourse/'+course.ID,{
            number:course.number,
            name :course.name,
            details : course.details,
            state : course.state,
            major : course.major
        }).success(function(){
            $('#myModal').modal('hide');
        });
    }


    //删除数据
    function deleteCourse(item){
        console.log(item._id);
        $http.delete('/api/deleteCourse/'+item._id)
            .success(function(){
                console.log('remove success');
            });
    }

/*
**************************************************************************************************
 */


    //删除数据
    function remove(item) {
        var items = [];
        course.items.forEach(function(i) {
            if (i != item) {
                items.push(i);
            }
        });
        course.items = items;
    }


    ////编辑数据
    //function edit(item) {
    //    var index = 0;
    //    for (var i = 0; i < item.length; i++) {
    //        if (course.items[i] == item)
    //            index = i;
    //    }
    //    course.number = item.number;
    //    course.name = item.name;
    //    course.details=item.details;
    //    course.state=item.state;
    //    course.major=item.major;
    //    course.index = index;
    //    $('#myModal').modal();
    //}

    //保存
    function save() {
        var item = course.items[course.index];
        item.number = course.number;
        item.name = course.name;
        item.details=course.details;
        item.state=course.state;
        item.major=course.major;
        //init();
        $('#myModal').modal('hide');
    }

    //取消
    function cancel() {
        //init();
        $('#myModal').modal('hide');
        $('#myModal1').modal('hide');
    }

}
