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
    students: Array<{"id": String}>;
    addChecked: boolean;
    nextId: number;
    // For present application, I need to inject only $scope. I am leaving the others to remind me that these also can
    // injected.
    static $inject = ['$scope', '$http', '$element'];
    constructor(private $scope: IStudent,
                private $http : ng.IHttpService,
                private $element: JQuery)
    {
        $scope.studentController = this;
        this.course = $scope.course;
        this.root = 'http://localhost:3000/' + this.course + "/";
        this.getData();
    }

    private getData() {
        // Without the next statement, the function below cannot access the 'this' of the outer scope.
        // self is of type Window. this is of type CustomCtrl. How do things work then?
        var self = this;
        ////self: CustomCtrl = this; Does not work. I don't know how to do this in TypeScript
        //self: Window = this; Does not work
        $.ajax({
            url: this.root,
            method: 'GET'
        }).then(function(data) {
            // The compiler first looks for self in the present function scope. Not finding it, it next looks in the
            // most immediate outer scope, namely that of getData. It finds it here.
            self.students = data;
            self.$scope.$apply();
            self.nextId = 0;
            for (let student of self.students) {
                if (Number(student.id) > self.nextId) self.nextId = Number(student.id);
            }
            self.nextId += 1;
        });
    }
    private add(student) {
        if (typeof student != 'undefined') {
            var self = this;
            this.addChecked = false;
            $.ajax(this.root, {
                method: 'POST',
                data: {
                    fname: student.fname,
                    lname: student.lname,
                    id: this.nextId
                }
            }).then(function (data) {

                console.log(data);
                student.fname = "";
                student.lname = "";
                self.getData();
            });
        }
    }
    private update(student1, index) {
        var self = this;
        if (typeof student1 != 'undefined') {
            $.ajax(this.root + this.students[index].id, {
                method: 'PUT',
                data: student1
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
            this.root + this.students[index].id;
            $.ajax(this.root + this.students[index].id, {
                method: 'DELETE'
            }).then(function(data) {
                console.log(data);
                self.getData();
            });
        }
    }
}
// Looks like the registration of controller is not needed
//angular.module('myApp').controller("CustomCtrl", CustomCtrl);

