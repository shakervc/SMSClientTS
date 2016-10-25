/**
 * Created by Shaker on 10/19/2016.
 */
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="components/directives/courseDirective.ts" />


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

        scope = {
            course: '@'
        }
        //template = '<p>asdfgh</p>';
        templateUrl = "components/directives/courseDirective.html";
        controller = CustomCtrl;
    }

    angular.module('myApp', [])
        .directive('courseDirective', courseDirective.instance);

}


//http://devartisans.com/articles/angularjs-directives-typescript
//http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
//http://stackoverflow.com/questions/26920055/define-angularjs-directive-using-typescript-and-inject-mechanism
//http://www.siddharthpandey.net/how-to-write-custom-angularjs-directive-using-typescript/
