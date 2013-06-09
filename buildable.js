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
		// .__init(args) calls all '.init' methods that are registered
		// in the .__initqueue array.
		// It accepts only one argument: an array with arguments to be passed
		// on to all initializer methods.
		__init: function(args) {
			// args is and array to be passed as arguments to the init methods.
			var _this = this;

			_.each(this.__initqueue, function(initializer, order) {
				initializer.apply(_this, args);
			});
		},

		//////// INTERFACE //////////

		// .build() returns an 'instance' of the object.
		// It receives any number of arguments, all of which are passed to all registered 
		// '.init()' methods (in the .__initqueue)
		build: function() {
			var obj = Object.create(this),
				args = _.args(arguments);

			// call obj's init method in its own context!!! 
			obj.__init(args);

			// set 
			return obj;
		},

		// .extend() copies all properties from its arguments to
		// the current this object's properties.
		// Before doing this copy, the method checks if the 'extension' objects
		// have a method named 'init'. If so, that method is 
		// added to a queue, the .__initqueue, which contains all initialization
		// methods to be called when the object is actually instatiated (when .build() is called).
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

			// add this object to the array, so that it is the first object
			// and so all properties from the other args are copied into this object
			args.unshift(this);

			var extended = _.extend.apply(null, args);

			this.__initqueue = extended.__initqueue = initqueue;
		},
	};

	return Buildable;
});