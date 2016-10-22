/// <reference path="../../typings/angularjs/angular.d.ts" />

// We are telling the compiler that the following variables will be in IStudent
interface IStudent  extends ng.IScope
{
    root: string;
    getData: (any)=> void;
    add: ()=> void;
    update: ()=> void;
    delete: ()=> void;
    variable: String;
    course: String;
    students: [{}];
    studentController: CustomCtrl;
}
class CustomCtrl {
    static $inject = ['$scope', '$http', '$element'];
    constructor(private $scope: IStudent,
                private $http : ng.IHttpService,
                private $element: JQuery)
    {
        root: String;
        console.log($scope.course);
        $scope.studentController = this;
        $scope.variable = "Wake up";
        $scope.root = 'http://localhost:3000/' + $scope.course;
        this.root = 'http://localhost:3000/' + $scope.course;
        //$scope.$ = angular.element;
        $scope.getData = this.getData;
        $scope.add = this.add;
        $scope.update = this.update;
        $scope.delete = this.delete;
        this.getData($scope);
    }
    // Don't like having to pass $scope  as an argument
    private getData($scope: IStudent) {
        $.ajax({
            url: this.root,
            method: 'GET'
        }).then(function(data) {
            // The following works
            $scope.variable = "I am going to sleep";
            $scope.students = data;
            $scope.$apply();

            // The following stores the data correctly. However, the $apply() does not work.
            this.variable = "I am going to sleep";
            this.students = data;
            //this.$apply();
            //$scope.$apply();
            // Assume that the id's are in order. Otherwise, I may need to do a sort.
            //nextId = ++$scope.students[$scope.students.length - 1].id;
            // The next line does not work
        });
    }
    private add() {
    }
    private update($scope, student1, index) {
        console.log(student1);
        console.log(index);
    }
    private delete() {
    }
}
// Looks like the registration of controller is not needed
//angular.module('myApp').controller("CustomCtrl", CustomCtrl);


//url: 'http://localhost:3000/Physics',




//// Just define controller in a separate file (without registering it)
//var controller =  ["$scope", "$http", function ($scope, $http) {
//    var root = 'http://localhost:3000/' + $scope.course +'/';
//    //var root = 'http://localhost:3000/Physics%20101';
//    var nextId;
//
//    $scope.message1 = "List of Current Students in ";
//// Define functions
//// getData is called multiple times -- this may cause problems in the value of nextId
//    $scope.getData = function () {
//        $.ajax({
//            url: root,
//            method: 'GET'
//        }).then(function(data) {
//            $scope.students = data;
//            // Assume that the id's are in order. Otherwise, I may need to do a sort.
//            nextId = ++$scope.students[$scope.students.length - 1].id;
//            $scope.$apply();
//        });
//    }
//
//    $scope.add = function(student) {
//        if (typeof student != 'undefined') {
//            $scope.checked = false;
//            $.ajax(root, {
//                method: 'POST',
//                data: {
//                    fname: student.fname,
//                    lname: student.lname,
//                    id: nextId
//                }
//            }).then(function (data) {
//                ++nextId;
//                console.log(data);
//                student.fname = "";
//                student.lname = "";
//                $scope.getData($scope);
//                $scope.$apply();
//            });
//        }
//    }
//
//    $scope.update = function(student1, index) {
//        if (typeof student1 != 'undefined') {
//            $.ajax(root + $scope.students[index].id, {
//                method: 'PUT',
//                data: student1
//            }).then(function (data) {
//                student1.fname = ""
//                student1.lname = "";
//                $scope.getData($scope);
//            });
//        }
//    }
//
//    $scope.delete = function(index) {
//        if (confirm("Are you sure you want to delete this student?")) {
//            //$scope.students.splice(index, 1);
//            deleteData($scope, $scope.students[index].id);
//        }
//    }
//// Start run
//    $scope.getData();
//
//
//    function deleteData($scope, $id) {
//        root += $id;
//        $.ajax(root, {
//            method: 'DELETE'
//        }).then(function(data) {
//            console.log(data);
//            $scope.getData($scope);
//            $scope.$apply();
//        });
//    }
//}];

/*
PROBLEMS 10/18/2016

In either course
. Cannot modify last student
. Cannot delete student
. Cannot add student -- may have to do with id
. If I remove the scope: {...} in the directive, I don't get the value of the attribute. Isn't the default to get all
scope variables?

TODO 10/18/2016

 High Priority

. Redesign the id part -- may need to have two nextIds
. Fix known problems
. Practice working with different http messages
. Get drilling in Javascript
. Having a course name like Chemistry 101 does not work. How to hanlde the space before 101?

 Low Priority
. Create a typescript version of the project
. Write my own server
. Improve style
. RESTMOD

NOTES

. I got my server from https://jsonplaceholder.typicode.com/

 I have downloaded their software into c:/json-server-master and globally installed a server. I also have a db.json in
 this directory.

 json-server --watch db.json

 chemistry": [ { "fname": "Rihana", "lname": "Eswaran", "id": 4 },
               { "fname": "Ju", "lname": "Joobi", "id": 4 }]
 physics":   [ { "fname": "Rihana", "lname": "Eswaran", "id": 4 } ]

*/