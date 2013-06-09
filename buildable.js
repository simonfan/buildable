define(['underscore','_.mixins'],
function(undef      , undef    ) {

	// define the Object.create method.
	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			var F = function() {};
			F.prototype = o;
			return new F();
		};
	}

	var Buildable = {
	//	init: function() {},	// no-op to be overriden by objects

		// effective initializer
		_init: function() {
			var _this = this,
				args = _.args(arguments);

			_.each(this.__initqueue, function(initializer, order) {
				initializer.apply(_this, args);
			});
		},

		//////// INTERFACE //////////

		build: function() {
			var obj = Object.create(this),
				args = _.args(arguments);

			// call obj's init method in its own context!!! 
			obj._init.apply(obj, args);

			// set 
			return obj;
		},
		extend: function() {

			var _this = this,
				args = _.args(arguments);


			// create the initqueue or override the existing one.
			var initqueue = this.__initqueue ? _.clone(this.__initqueue) : [];
			console.log(initqueue)

			// extract the initializers from the extend objects and add them to 
			// the initialization queue.
			_.each(args, function(obj, index) {
				if (typeof obj.init === 'function') {
					initqueue.push(obj.init);
				}
			});

			// add this object to the array
			args.unshift(this);

			var extended = _.extend.apply(null, args);

			extended.__initqueue = initqueue;
			return extended;
		},
	};

	return Buildable;
});