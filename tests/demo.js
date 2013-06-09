define(['buildable'], function(Buildable) {
	window.Demo = Object.create(Buildable);

	// extend the buildable
	Demo = Demo.extend({
		init: function(data1, data2) {
			this.data1 = data1;
			this.data2 = data2;

			console.log('data1: ', data1);

			console.log('data2: ', data2);
		}
	});

	// initialize a new object
	window.demo1 = Demo.build('demo1', { a: 1 });

	window.demo2 = Demo.build('demo2', { b: 9 });

	console.log('Component module demo running');




	window.tree = {
		ancestral: {
			init: 'ancestral',
		},
		parent: {
			init: function() {
				return 'parent'
			}
		},
		child: {}
	}


	window.object = Object.create(Buildable);
	object.extend(tree.ancestral);
	object.extend(tree.parent);

	console.log(object);
});