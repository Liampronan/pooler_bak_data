'use strict';

/* Services */
// Demonstrate how to register services
// In this case it is a simple value service.
//angular.module('myApp.services', []).
//    value('version', '0.1');

angular.module('mainApp')
    .service('uberDataService', ['$http', '$stateParams', '$q',
        function($http, $stateParams, $q){

          this.getProducts = function(){
            return $http({method: 'get', url: '/uber/api/products'})
          };

          this.getPrices = function(startLat, startLng, endLat, endLng){
            return $http({method: 'get',
                          url: '/uber/api/prices',
                          params: {
                            startLat: startLat,
                            startLng: startLng,
                            endLat: endLat,
                            endLng: endLng}})
          };

          this.getTimes = function(startLat, startLng){
            return $http({method: 'get',
              url: '/uber/api/times',
              params: {
                startLat: startLat,
                startLng: startLng}})
          };
        }])
    .service('sfLocationService', ['$http', '$stateParams', '$q',
        function($http, $stateParams, $q){

          this.getRandomSFLocation = function(){
            return $http.get('sfLocations.json');
          }
        }]);