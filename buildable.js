define(['underscore'], function(undef) {

	// define the Object.create method.
	if (typeof Object.create !== 'function') {
		Object.create = function(o) {
			var F = function() {};
			F.prototype = o;
			return new F();
		};
	}

	var Buildable = {
		init: function() {},	// no-op to be overriden by objects
		build: function() {
			var obj = Object.create(this);

			var args = Array.prototype.slice.call(arguments, 0)

			// call obj's init method in its own context!!! 
			obj.init.apply(obj, args);
			return obj;
		},
		extend: function() {

			var args = Array.prototype.slice.call(arguments, 0);

			args.unshift(this);

			return _.extend.apply(null, args);
		}
	}

	return Buildable;
});