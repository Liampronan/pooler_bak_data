'use strict';
/* main App Controllers */

var mainAppControllers = angular.module('mainAppControllers', ["ui.map", "ui.event"]);

mainAppControllers.controller('LoginCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {

        $scope.failed_login = "";

        $scope.login = function()
        {

            var user = {"username": $scope.username, "password": $scope.password};

            if($scope.username!==undefined || $scope.password !==undefined){
                $http({method: 'POST', url: '/api/login', data:user}).
                    success(function(data, status, headers, config) {
                        console.log(data);
                        $window.location.href="/home";
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                        noty({text: data,  timeout: 2000, type: 'error'});
                    });
            }

        }
    }
]);


mainAppControllers.controller('RegistrationCtrl', ['$scope', '$http','$window','$location',
    function ($scope, $http) {


    }
]);

mainAppControllers.controller('PriceCtrl', ['$scope', '$http', '$window', '$location',
                              'uberDataService', 'sfLocationService','$q',
  function ($scope, $http, $window, $location, uberDataService, sfLocationService, $q) {
    getRandomSFLocation().then(function(startLocation){
      $scope.startLat = startLocation["latitude"];
      $scope.startLng = startLocation["longitude"]
      console.log($scope.startLat)
      console.log($scope.startLng)
    })
    getRandomSFLocation().then(function(endLocation){
      $scope.endLat = endLocation["latitude"];
      $scope.endLng = endLocation["longitude"]
    })


    $scope.accuracy = "0";
    $scope.error = "";
    $scope.model = { myMap: undefined };
    $scope.myMarkers = [];




    $scope.addMarker = function(position){
//      TODO: allow user address input via map
//      $scope.map.center = {latitude: position.coords.latitude, longitude: position.coords.longitude};
    }
    
    $scope.showResult = function () {
      return $scope.error == "";
    }

    $scope.mapOptions = {
      center: new google.maps.LatLng($scope.startLat, $scope.startLng),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.showPosition = function (position) {
      $scope.startLat = position.coords.latitude;
      $scope.startLng = position.coords.longitude;
      $scope.accuracy = position.coords.accuracy;
      $scope.$apply();

      var latlng = new google.maps.LatLng($scope.startLat, $scope.startLng);
      $scope.model.myMap.setCenter(latlng);
      $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
//    TODO: look up better way -- some kind of callback so that showEndLocation is not wrapped in showPosition..
      $scope.showEndLocation();
    }

    $scope.showEndLocation = function (position) {
      var latlng = new google.maps.LatLng($scope.endLat, $scope.endLng);
      $scope.model.myMap.setCenter(latlng);
      $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
    }

    $scope.getPrices = function () {
      uberDataService.getPrices($scope.startLat, $scope.startLng, $scope.endLat, $scope.endLng)
        .success(function (data, status, headers, config) {
          console.log(data);
          $scope.prices = data;
        })
        .error(function (data, status, headers, config) {
          console.log(data);
          noty({text: data, timeout: 2000, type: 'error'});
        });
    };

    $scope.getPricesandTimes = function(){
      $scope.getPrices();
      $scope.getTimes();
    }

    $scope.getTimes = function (){
      uberDataService.getTimes($scope.startLat, $scope.startLng, $scope.endLat, $scope.endLng)
          .success(function (data, status, headers, config) {
            console.log(data);
            $scope.times = data;
          })
          .error(function (data, status, headers, config) {
            console.log(data);
            noty({text: data, timeout: 2000, type: 'error'});
          });
    }

    $scope.getSurgeRange = function (lowEstimate, highEstimate, surgeMultiplier) {
      var lowEstimate = lowEstimate * surgeMultiplier;
      var highEstimate = highEstimate * surgeMultiplier;
      return "$" + lowEstimate + "-" + highEstimate
    };

    $scope.getMinutes = function(seconds){
        return (seconds / 60).toFixed(2)
    }

    $scope.showError = function (error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          $scope.error = "User denied the request for Geolocation."
          break;
        case error.POSITION_UNAVAILABLE:
          $scope.error = "Location information is unavailable."
          break;
        case error.TIMEOUT:
          $scope.error = "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
          $scope.error = "An unknown error occurred."
          break;
      }
      $scope.$apply();
    }

    $scope.getLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
      }
      else {
        $scope.error = "Geolocation is not supported by this browser.";
      }
    }

    var getProducts = function() {
      uberDataService.getProducts()
          .success(function (data, status, headers, config) {
            console.log(data);
            $scope.products = data;
          })
          .error(function (data, status, headers, config) {
            console.log(data);
            noty({text: data, timeout: 2000, type: 'error'});
          });
    };

    function getRandomSFLocation(){
      var deferred = $q.defer();
      sfLocationService.getRandomSFLocation().success(function (data, status, headers, config) {
        var length = data.length;
        var randInRange = Math.floor(Math.random() * length)
        deferred.resolve(data[randInRange]);
      })
      return deferred.promise
    }

    getProducts();
    $scope.getLocation(); //get loction from user's browser
  }])


/* web App Controllers */


//var webAppControllers = angular.module('webAppControllers', []);
//
//
//webAppControllers.controller('HomeCtrl', ['$scope', '$http','$window','$location',
//    function ($scope, $http) {
//
//
//    }
//]);