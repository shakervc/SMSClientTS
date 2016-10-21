/**
 * Created by Shaker on 10/19/2016.
 */
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="components/directives/courseDirective.ts" />

class HelloWorldController{

    constructor(private $scope){

        $scope.prefixText = "Hello ";
        $scope.inputText = " ";
        $scope.displayText = "";
        $scope.onDisplay = () => {

            this.$scope.displayText = this.$scope.prefixText + this.$scope.inputText;
        };
    }
}

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
module app {
    'use strict';


    class courseDirective implements ng.IDirective {
        /*
         * This static method is needed to return instance
         */
        static instance() : ng.IDirective {
            return new courseDirective;
        }


        restrict = 'E';
        link(scope : ng.IScope, elements : ng.IAugmentedJQuery, attrs : ng.IAttributes) {
            //your code
        }
        //template = '<p>asdfgh</p>';
        templateUrl = "components/directives/courseDirective.html";
        controller = CustomCtrl;
    }

    angular.module('myApp', [])
        .directive('courseDirective', courseDirective.instance)
        .controller("CustomCtrl", CustomCtrl);

}


//http://devartisans.com/articles/angularjs-directives-typescript
//http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
//http://stackoverflow.com/questions/26920055/define-angularjs-directive-using-typescript-and-inject-mechanism
//http://www.siddharthpandey.net/how-to-write-custom-angularjs-directive-using-typescript/