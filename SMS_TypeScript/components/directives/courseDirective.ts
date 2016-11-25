/// <reference path="../../typings/angularjs/angular.d.ts" />

// We are telling the compiler that the following variables will be in IStudent
interface IStudent  extends ng.IScope
{
    course: String;
    studentController: CustomCtrl;
}
class CustomCtrl {
    root: string;
    course: String;
    students: {};
    addChecked: boolean;
    // For present application, I need to inject only $scope. I am leaving the others to remind me that these also can
    // injected.
    static $inject = ['$scope', '$http', '$element'];
    constructor(private $scope: IStudent,
                private $http : ng.IHttpService,
                private $element: JQuery)
    {
        $scope.studentController = this;
        this.course = $scope.course;

        this.root = 'http://localhost:4567/' + this.course + "/";
        this.getData();
    }
// 11/20/2106 Bottom Line
// Node server sends data and we take the success branch
// Stack server sends data but we take the error branch. I don't know how to set the results in that branch
// self is flaky too.
/*
  The JSON payload is processed by angular BEFORE the then branch is reached. If there is any error (such as a single quote in the payload,
  myError is called instead of mySuccess.
  I couldn't get the $.ajax to work -- I expected it to work. I didn't troubleshoot it.
 $.ajax({
 url: this.root,
 method: 'GET'
 }).then( function mySucces(response) {

 var result = $.parseJSON(data); // Use this version for the simple Java server
 var result = data;  // Use this version for the node server
 //result = [{"fname": "Venkat", "lname": "Shaker", "id": 1}];  // Use this to input test data
 self.students = result;
 self.$scope.$apply();

 */
    private getData() {
        // Without the next statement, the function below cannot access the 'this' of the outer scope.
        // self is of type Window. this is of type CustomCtrl. How do things work then?
        var self = this;
        console.log("Going to get data");
        ////self: CustomCtrl = this; Does not work. I don't know how to do this in TypeScript
        //self: Window = this; Does not work

        this.$http({
            method : "GET",
            url : this.root
        }).then(function mySucces(response) {
            console.log("success branch");
            // How to get rid of the TypeScript warning?
            self.students = response.data;
            // Leaving the next line in causes an Error: [$rootScope:inprog]. This used to be necessary. Is this necessary after updates?
            //self.$scope.$apply(); // Getting an error on this line while processing each object. However, the data is still displayed correctly
        }, function myError(response) {
            console.log("Error processing JSON from server");
        });
    }
    private add(student) {

        if (typeof student != 'undefined') {
            var self = this;
            this.addChecked = false;
            this.$http( {
                method: "POST",
                url : this.root,
                data: { fname: student.fname,
                        lname: student.lname,
                        id: 20
                }
            } ).then(function mySucces(response) {
                //console.log(self.students);
                console.log(response.data);
                student.fname = "";
                student.lname = "";
                self.students = response.data;
                //self.$scope.$apply();
            });
        }
    }
    private update(student1, index) {
        var self = this;
        if (typeof student1 != 'undefined') {
            this.$http( {
                method: 'PUT',
                data: {
                    newdata: student1,
                    index: index
                },
                url: this.root + this.students[index].id
            }).then(function (data) {
                student1.fname = ""
                student1.lname = "";
                self.getData();
            });
        }
    }
    private delete(index) {
        if (confirm("Are you sure you want to delete this student?")) {
            var self = this;
            this.$http( {
                method: "DELETE",
                url: this.root + this.students[index].id,

                data: {
                    index: index
                }
            } ).then(function mySucces(response) {
                //console.log(self.students);
                console.log(response.data);
                self.students = response.data;
                //self.$scope.$apply();
            });
        }
    }
}
/*
 Looks like the registration of controller, i.e., angular.module('myApp').controller("CustomCtrl", CustomCtrl);,  is not needed

 TODO:

 . There is an error while processing each object in the array: Error: [$rootScope:inprog]  http://stackoverflow.com/questions/22733422/angularjs-rootscopeinprog-inprogress-error.
   Got rid of the error by commenting out the $apply() line.
 . Getting getData to work with $.ajax method
 . Storing things in GitHub
 . List of questions for the Davids
*/

