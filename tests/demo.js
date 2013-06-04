define(['buildable'], function(Buildable) {
	window.Demo = Object.create(Buildable);

	// extend the buildable
	Demo = Demo.extend({
		init: function(data) {
			console.log(data);
		}
	});

	// initialize a new object
	window.demo = Demo.build({ a: 1 });

	console.log('Component module demo running');
});