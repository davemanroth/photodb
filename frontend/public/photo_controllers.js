angular.module('photoCtrl', [])

// Photo List
	.controller('PhotoListController', ['$scope', '$http', 
		function($scope, $http) {
			$scope.pageTitle = 'Photo gallery';
			/*
			*/
			$http.get('/api/photos_all')
			.success( function(data, status, header, config) {
				$scope.photos = data.photos;
				$scope.categories = data.categories;
				$scope.filters = data.filters;
				$scope.sortField = '-date_uploaded';

// Sorting
				$scope.sortPhotos = function () {
					$scope.sortField = $scope.sortVal;
				}

// Filter Photographer
				$scope.nameFilter = function (photo) {
					if(!$scope.filterAuthor) {
						return true;
					}
					else {
						return $scope.filterAuthor == photo.author.username;
					}
					/*
					*/
				}
				
// Filter Category
				$scope.catFilter = function (photo) {
					if(!$scope.filterCategory || $scope.filterCategory == '*') {
						return true;
					}
					else {
						var selected = $scope.filterCategory.sort();
						var actual = photo.category.sort();
						return filterSelectedCategories(selected, actual);
					}
				}

// Filter Camera
				$scope.cameraFilter = function (photo) {
					if(!$scope.filterCamera || $scope.filterCamera == '*') {
						return true;
					}
					else {
						return $scope.filterCamera == photo.camera;
					}
				}

// Filter Shutter
				$scope.shutterFilter = function (photo) {
					if(!$scope.filterShutter || $scope.filterShutter == '*') {
						return true;
					}
					else {
						return $scope.filterShutter == photo.shutter;
					}
				}

// Filter fStop
				$scope.fstopFilter = function (photo) {
					if(!$scope.filterFstop || $scope.filterFstop == '*') {
						return true;
					}
					else {
						return $scope.filterFstop == photo.fstop;
					}
				}

// Filter ISO
				$scope.isoFilter = function (photo) {
					if(!$scope.filterIso || $scope.filterIso == '*') {
						return true;
					}
					else {
						return $scope.filterIso == photo.iso;
					}
				}
			})
			.error( function(data, status, header, config) {
				$scope.photos = 'Error!';
				$scope.error = data.photos;
			});

// Category filter helper function
			function filterSelectedCategories(selected, actual) {
				if(selected.length > actual.length) {
					return false;
				}
				else if(selected.length == actual.length) {
					return angular.equals(selected, actual);
				}
				else {
					for(var i = 0; i < selected.length; i++) {
						var result = false;
						for(var j = 0; j < actual.length; j++) {
							if (selected[i] == actual[j]) {
								result = true;
							}
						}
					}
					return result;
				}
			}
		}
	])
			/*
			*/

// Photo upload
	.controller('PhotoUploadController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {
			$http.get('/api/addphoto')
				.success( function(data, status, header, config) {
					$scope.categories = data.categories;
					$scope.filters = data.filters;
					$scope.submitPhoto = function () {
						var data = {
							photo: $scope.photo,
							title: $scope.title,
							category: $scope.category,
							author: $scope.author,
							writeup: $scope.writeup,
							access: $scope.access,
							camera: $scope.camera,
							shutter: $scope.shutter,
							fstop: $scope.fstop,
							iso: $scope.iso,
							flash: $scope.flash
						};
						$http.post('/api/addphoto', data, 
							{
								transformRequest: function (data) {
									var fd = new FormData();
									for(var key in data) {
										fd.append(key, data[key]);
									}
									return fd;
								},
								headers: {'Content-Type': undefined}
							})
							.success( function(data) {
								$location.path('/photos/all');
							});
					/*
					*/
					}
				})
				.error( function(data, status, header, config) {
					$scope.categories = '';
					$scope.error = data.categories;
				});
		}
	])

// Photo detail
	.controller('PhotoDetailController', ['$scope', '$http', '$routeParams', 
		function($scope, $http, $routeParams) {
			$http.get('/api/photos/' + $routeParams.id)
			.success( function(data, status, header, config) {
				$scope.photo = data.photo;
			})
			.error( function(data, status, header, config) {
				$scope.photo = 'Error!';
				$scope.error = data.photo;
			});
			$scope.$on('update_critiques', function (event, newCrit) {
				$scope.photo.critiques.push(newCrit);
			});
		}
	]);
