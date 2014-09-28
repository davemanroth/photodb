angular.module('feedbackCtrl', [])

	.controller('FeedbackController', ['$scope', '$http', 
		function ($scope, $http) {
			$scope.visual, $scope.feedbackArea = false;
			$scope.feedbackOption = true;
			$scope.addFeedback = function() {
			}
			$scope.showHideFeedback = function ($event) {
				var option = $event.target.id;
				switch (option) {
					case 'showFeedback':
						$scope.feedbackArea = true;
						$scope.feedbackOption = false;
						break;
					case 'cancelFeedback':
						$scope.feedbackArea = false;
						$scope.feedbackOption = true;
						break;
				}
			}
			$scope.showHideVis = function ($event) {
				var checkbox = $event.target;
				$scope.visual = checkbox.checked ? true : false;
			}
		}
	])

/*
	*/
	.directive('visFeedback', 
		function () {
			return {
				restrict: 'E',
				link: function (scope, element, attrs) {
					var canvas = document.getElementById('vis-body');
					var img = document.getElementById('img-detail');
					var vfg = new VisFeedbackGenerator(canvas);

					img.addEventListener('load', function () {
						vfg.setSize(img.width, img.height);
					});

					window.addEventListener('resize', function () {
						vfg.setSize(img.width, img.height);
					});

					canvas.addEventListener('click', function (e) {
						vfg.setMark(e);
					});
				}
			};
		}
	)
	
	.directive('comments',
		function () {
			return {
				retrict: 'E',
				template: '<h2>This is a test</h2>',
				replace: true
			}
		}
	)

	/*
	.directive('visComment',
		function () {
			return {
				retrict: 'E',
				template: '<h1>This is a test</h1>',
				//templateUrl: '/partials/commentBox.jade',
				//template: '<div class="comment-outer absolute"><div class="comment-inner"><h3>Comment</h3><textarea></textarea><button ng-click="cancelComment()">Cancel</button><button ng-click="submitComment()">Submit comment</button></div></div>'
				replace:true,
			}
		}
	);
	*/

	.controller('VisController', ['$scope', '$element', '$compile',
		function ($scope, $element, $compile) {
			$scope.createCommentBox = function () {
				var code = '<div class="comment-outer absolute"><div class="comment-inner"><h3>Comment</h3><textarea></textarea><button ng-click="cancelComment()">Cancel</button><button ng-click="submitComment()">Submit comment</button></div></div>';
				var vc = angular.element(code);
				$element.find('vis-comments').append($compile(vc)($scope));
				//$element.find('vis-comments').append( $compile('vis-comment')($scope) );
			}
			$scope.test = function () {
				console.log('This is a test');
			}
		}
	]);
