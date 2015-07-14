/**
 * Created by xiner on 7/11/15.
 */
angular
    .module('demo')
    .controller('SearchController', SearchController);
SearchController.$inject = ['$http'];
function SearchController($http){
    var  search = this;
    search.items = [];
    search.searchItems = [];
    search.add=add;
    search.searchCourse = searchCourse;
    getCourse();
    function add() {
        console.log(search.courseNum);
        $http.post('/api/course',{
            name : search.name,
            courseNum : search.courseNum
        }).success(function(){
            console.log('success');
        });
        getCourse();
    }

    function getCourse() {
        $http.get('/api/course')
            .success(function (data) {
                console.log(data);
                search.items = data;
            }).error(function () {
                console.log('error')
            });
    }

    function getsearchCourse(){
        console.log(search.class);
        $http.get('/api/search')
            .success(function(data){
                search.searchItems = data;
            }).error(function(){
                console.log('error')
            });
    }
    function searchCourse() {
        $http.get('/api/search',
            {
                params: {
                    keyword: search.keyword,
                    searchClass: search.class
                }
            }).success(function (data) {
                search.searchItems = data;
            });
    }
}