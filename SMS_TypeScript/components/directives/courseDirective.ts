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
    students: Array<Object>;
    // For present application, I need to inject only $scope. I am leaving the others to remind me that these also can
    // injected.
    static $inject = ['$scope', '$http', '$element'];
    constructor(private $scope: IStudent,
                private $http : ng.IHttpService,
                private $element: JQuery)
    {
        $scope.studentController = this;
        this.course = $scope.course;
        this.root = 'http://localhost:3000/' + this.course;
        this.getData();
    }

    private getData() {
        // Without the next statement, the function below cannot access the 'this' of the outer scope.
        var self = this;
        $.ajax({
            url: this.root,
            method: 'GET'
        }).then(function(data) {
            // The compiler first looks for self in the present function scope. Not finding it, it next looks in the
            // most immediate outer scope, namely that of getData. It finds it here.
            self.students = data;
            self.$scope.$apply();
        });
    }
    private add() {
    }
    private update(student1, index) {
        // Am getting correct values for arguments. I need the updated students array to do the PUT.
        console.log(student1.lname);
        console.log(index);
    }
    private delete() {
    }
}
// Looks like the registration of controller is not needed
//angular.module('myApp').controller("CustomCtrl", CustomCtrl);

