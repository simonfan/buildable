define(['buildable'], function(Buildable) {

return function() {

	test('Initqueue', function() {
		var One = Object.create(Buildable);
		One.extend({
			init: function() { this.signals = ['One-1'] }
		});

		One.extend({
			init: function() {
				this.signals.push('One-2')
			}
		});

		var one = One.build();



		var Two = Object.create(Buildable);
		Two.extend({
			init: function() { this.signals = ['Two-1'] }
		});

		Two.extend({
			init: function() { this.signals.push('Two-2') }
		},
		{
			init: function() { this.signals.push('Two-3') }
		},
		{
			init: function() { this.signals.push('Two-4') }
		});

		var two = Two.build();



		// guarantee that One and Two had separate initializations
		deepEqual(one.signals, ['One-1', 'One-2'])
		deepEqual(two.signals, ['Two-1','Two-2','Two-3','Two-4'])
	});










	test('Initqueue: two objects inherit from one single parent', function() {
		window.Parent = Object.create(Buildable);
		Parent.extend({
			init: function() { this.signals = ['Parent-1'] }
		});

		Parent.extend({
			init: function() { this.signals.push('Parent-2') }
		});
		
		var parent = Parent.build();
		deepEqual(parent.signals, ['Parent-1','Parent-2'], 'parent initialization')



		window.One = Object.create(Parent);
		One.extend({
			init: function() { this.signals.push('One-1'); }
		});

		One.extend({
			init: function() { this.signals.push('One-2'); }
		});

		window.parent = Parent.build();
		window.one = One.build();

		deepEqual(parent.signals, ['Parent-1','Parent-2'], 'parent initialization')
		deepEqual(one.signals, ['Parent-1','Parent-2','One-1', 'One-2'], 'one initialization')


		window.Two = Object.create(Parent)
		Two.extend({
			init: function() { this.signals.push('Two-1') }
		});

		Two.extend({
			init: function() { this.signals.push('Two-2') }
		},
		{
			init: function() { this.signals.push('Two-3') }
		},
		{
			init: function() { this.signals.push('Two-4') }
		});

		window.parent = Parent.build();
		window.one = One.build();
		window.two = Two.build();



		// guarantee that One and Two had separate initializations
		deepEqual(parent.signals, ['Parent-1','Parent-2'], 'parent initialization')
		deepEqual(one.signals, ['Parent-1','Parent-2','One-1', 'One-2'], 'one init')
		deepEqual(two.signals, ['Parent-1','Parent-2','Two-1','Two-2','Two-3','Two-4'], 'two init')




		window.Two1 = Object.create(Two);
		Two1.extend({
			init: function(data) {
				this.signals.push('Two1-1');
				this.data = data;
			}
		});

		window.Two2 = Object.create(Two);
		Two2.extend({
			init: function(data) {
				this.signals.push('Two2-1');
				this.data = data;
			}
		},
		{
			init: function(data) {
				this.signals.push('Two2-2');
				this.name = data.name;
			}
		});


		window.parent = Parent.build({ name: '121212' });
		window.one = One.build({ name: '121212' });
		window.two = Two.build({ name: '121212' });
		window.two1 = Two1.build({ name: '121212' });
		window.two2FIRST = Two2.build({ name: '121212' });
		window.two2SECOND = Two2.build({ name: '343434' });

		// guarantee that One and Two had separate initializations
		deepEqual(parent.signals, ['Parent-1','Parent-2'], 'parent initialization');
		equal(typeof parent.data, 'undefined');
		equal(typeof parent.name, 'undefined');

		deepEqual(one.signals, ['Parent-1','Parent-2','One-1', 'One-2'], 'one init');
		equal(typeof one.data, 'undefined');
		equal(typeof one.name, 'undefined');

		deepEqual(two.signals, ['Parent-1','Parent-2','Two-1','Two-2','Two-3','Two-4'], 'two init')
		equal(typeof two.data, 'undefined');
		equal(typeof two.name, 'undefined');

		deepEqual(two1.signals, ['Parent-1','Parent-2','Two-1','Two-2','Two-3','Two-4','Two1-1'], 'two1 init')
		deepEqual(two1.data, { name: '121212' });
		equal(typeof two1.name, 'undefined');

		deepEqual(two2FIRST.signals, ['Parent-1','Parent-2','Two-1','Two-2','Two-3','Two-4','Two2-1','Two2-2'], 'two1 init')
		deepEqual(two2FIRST.data, { name: '121212' });
		equal(two2FIRST.name, '121212');

		deepEqual(two2SECOND.signals, ['Parent-1','Parent-2','Two-1','Two-2','Two-3','Two-4','Two2-1','Two2-2'], 'two1 init')
		deepEqual(two2SECOND.data, { name: '343434' });
		equal(two2SECOND.name, '343434');

	});


}
});