angular.module('visFactory', [])

	.factory('VisFeedbackFactory', [
		function () {
			return function (canvas, img) {
				this.canvas = canvas;
				this.img = img;
				this.canWidth, this.canHeight = '';
				return {

					init: function () {
						angular.element(this.img).on('load', function () {
							this.canvas.width = $(this).width();
							this.canvas.height = $(this).height();
						});
					},

					setCanvasSize: function (width, height) {
						this.canvas.width = width;
						this.canvas.height = height;
					},
					


