var app = angular.module("MovieApp", ['ui.router']);

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
return service;
});

app.controller('ResultsController', function($scope, $stateParams, $state, MovieService) {
  $scope.pageName = $stateParams.searchResults;
  MovieService.movieSearch($scope.pageName)
      .success(function(data) {
        //give movie details, I hope
        console.log('Search details', data);
        $scope.movieQueries = data.results;
      });
});

app.controller('SearchController', function($scope, $stateParams, $state) {
  $scope.clickMovieSearch = function() {
      $state.go('searchView', {searchResults: $scope.query});

    };
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state({
    name: 'search',
    url: '/',
    templateUrl: 'search.html',
    controller: 'SearchController'
  })
  .state({
    name: 'searchView',
    url: '/{searchResults}',
    templateUrl: 'search_results.html',
    controller: 'ResultsController'
  });

  $urlRouterProvider.otherwise('/');
});
