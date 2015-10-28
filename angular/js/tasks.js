/* 
    script for the tasks.html file 
*/

angular.module('Tasks', [])
    .constant('taskKey', 'tasks')
    .controller('TasksController', function($scope, tasksKey) {
        'use strict';




        //overall array for every task we create in the application
        // initialize tasks property on the scope to an empty array
        // if angular from json is undefined; default scope.task to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];

        // initialize newTask to an empty object
        $scope.newTask = {};

        //
        function saveTasks() {
           localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        // adding a property to scope and adding it as a function
        // creating a new property called addTask and the value is any legal data type
        // functions are first class data types
        // add a function to add newTask to the array
        $scope.addTask = function() {
            // push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            // save the tasks
            saveTasks();

            // reset newTask to an empty object
            $scope.newTask = {};
        };


        // function to toggle taskdone state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });