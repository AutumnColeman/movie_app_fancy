var app = angular.module("MovieApp", ['ui.router']);

//Factory
app.factory('MovieService', function($http) {
  var service = {};
  var API_KEY = '8fa482ca4a8b8964d4f857eee886e8e9';

  service.movieSearch = function(query) {
  var url = 'http://api.themoviedb.org/3/search/movie';
  return $http({
    method: 'GET',
    url: url,
    params: { api_key: API_KEY,
    query: query }
  });
};
  service.movieDetails = function(movieId) {
    var url = 'http://api.themoviedb.org/3/movie/' + movieId;
    return $http({
      method: 'GET',
      url: url,
      params: { api_key: API_KEY }
    });
  };
return service;
});

//Controllers
app.controller('ResultsController', function($scope, $stateParams, $state, MovieService) {
  $scope.pageName = $stateParams.query;
  console.log($scope.pageName);
  MovieService.movieSearch($scope.pageName)
      .success(function(data) {
        //give movie results, I hope
        console.log(data);
        $scope.movieQueries = data.results;
      });
      $scope.details = function(id) {
        console.log(id);
        $state.go('movie_details', { movieId: id });
      };
});

app.controller('SearchController', function($scope, $stateParams, $state) {
  $scope.search = function() {
      $state.go('search_results', {query: $scope.query});
    };

});

app.controller('DetailsController', function($scope, $stateParams, $state, MovieService) {
  $scope.movieId = $stateParams.movieId;
  console.log($scope.movieId);
  MovieService.movieDetails($scope.movieId)
      .success(function(data) {
        //give movie results, I hope
        console.log(data);
        $scope.movieQueries = data;
        console.log($scope.movieQueries);
      });
      $scope.details = function(id) {
        console.log(id);
        $state.go('movie_details', { movieId: id });
      };
});

//States
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state({
    name: 'search',
    url: '/search',
    templateUrl: 'search.html',
    controller: 'SearchController'
  })
  .state({
    name: 'search_results',
    url: '/search/{query}',
    templateUrl: 'search_results.html',
    controller: 'ResultsController'
  })
  .state({
    name: 'movie_details',
    url: '/movie/{movieId}',
    templateUrl: 'movie_details.html',
    controller: 'DetailsController'
  });

  $urlRouterProvider.otherwise('/search');
});
