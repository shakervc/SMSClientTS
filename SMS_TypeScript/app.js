/**
 * Created by Shaker on 10/19/2016.
 */
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="components/directives/courseDirective.ts" />
var HelloWorldController = (function () {
    function HelloWorldController($scope) {
        var _this = this;
        this.$scope = $scope;
        $scope.prefixText = "Hello ";
        $scope.inputText = " ";
        $scope.displayText = "";
        $scope.onDisplay = function () {
            _this.$scope.displayText = _this.$scope.prefixText + _this.$scope.inputText;
        };
    }
    return HelloWorldController;
})();
//Goes through the directive but nothing happens. Does not go to the controller
//angular
//    .module("myApp", [])
//    .directive("courseDirective", function () {
//        return {
//            scope: {
//                course: '@'
//            },
//            //templateUrl: "components/directives/courseDirective.html",
//            template: "<p>asdfgh</p>"
//            ,
//            controller: HelloWorldController
//        };
//    })
//;
// This directive displays the p element.
//http://devartisans.com/articles/angularjs-directives-typescript  Best tutorial so far
var app;
(function (app) {
    'use strict';
    var courseDirective = (function () {
        function courseDirective() {
            this.restrict = 'E';
            //template = '<p>asdfgh</p>';
            this.templateUrl = "components/directives/courseDirective.html";
            this.controller = CustomCtrl;
        }
        /*
         * This static method is needed to return instance
         */
        courseDirective.instance = function () {
            return new courseDirective;
        };
        courseDirective.prototype.link = function (scope, elements, attrs) {
            //your code
        };
        return courseDirective;
    })();
    angular.module('myApp', [])
        .directive('courseDirective', courseDirective.instance)
        .controller("CustomCtrl", CustomCtrl);
})(app || (app = {}));
//http://devartisans.com/articles/angularjs-directives-typescript
//http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
//http://stackoverflow.com/questions/26920055/define-angularjs-directive-using-typescript-and-inject-mechanism
//http://www.siddharthpandey.net/how-to-write-custom-angularjs-directive-using-typescript/ 
//# sourceMappingURL=app.js.map