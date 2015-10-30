angular.module('Movies', ['ui.router'])
    // returns movieJSON to us
    // factory allows us to inject into other controllers
    .factory('moviesJSON', function($http) {
        return $http.get('data/movies-2014.min.json');
    })

    // registers a function to be called when an entire module is being initialized
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/movies',
                templateUrl: 'views/movies-list.html',
                controller: 'MoviesController'
            })
            .state('detail', {
                url: '/movies/:index',
                templateUrl: 'views/movies-detail.html',
                controller: 'MovieDetailController'
            });
        // if someone tpes in something wacky, it'll default to the movies list
        $urlRouterProvider.otherwise('/movie');
    })

    // moviesJSON is our dataset and want to access it
    .controller('MovieDetailController', function($scope, $stateParams, moviesJSON) {
        moviesJSON.then(function(results) {
            $scope.movie = results.data[$stateParams.index];
        });
    })

    // add the moviesJSON parameter
    .controller('MoviesController', function($scope, $http, moviesJSON) {

        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X':6
        };

        //$http.get('data/movies-2014.min.json')
        // we can take the above out and movies JSON
        moviesJSON.then(function(results) {
            // map will construct a new array and will return the same size array
            // as the output one
            // results is an object with information about the entire HTTP response
            // the data itself can be accessed via its 'data' property
            $scope.movies = results.data.map(function(movie) {
                movie.ratingOrdinal = ratingsMap[movie.rating];
                return movie;
            });

            $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));

        });

        $scope.setSort = function(propertyName) {
            if ($scope.sortCol === propertyName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propertyName;
                $scope.sortReverse = false;
            }
        }


        // to use lodash, google lodash cdn
        //https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.js
    });