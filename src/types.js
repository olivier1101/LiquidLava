/**
 * Note: types require initialization (Lava.initCore())
 */
Lava.types = {

	// for extension only
	AbstractType: {

		type_name: null,

		/**
		 * @param {string} value
		 * @param {Object} descriptor
		 * @returns {boolean}
		 */
		fromString: function(value, descriptor) {
			if (!this.isValidString(value, descriptor)) Lava.throw("Invalid " + this.type_name + " string: " + value);
			return this.fromSafeString(value, descriptor);
		}

	},

	Boolean: {

		extends: 'AbstractType',

		_mappings: {
			'true': true,
			'1': true,
			'false': false,
			'0': false
		},

		/**
		 * @param {*} value
		 * @returns {boolean}
		 */
		isValidValue: function(value) {

			return typeof(value) == 'boolean';

		},

		isValidString: function(value) {

			return (value in this._mappings);

		},

		fromSafeString: function(value) {

			return this._mappings[value];

		}

	},

	String: {

		extends: 'AbstractType',

		/**
		 * @param {*} value
		 * @returns {boolean}
		 */
		isValidValue: function(value) {

			return typeof(value) == 'string';

		},

		isValidString: function(value) {

			return true;

		},

		fromSafeString: function(value) {

			return value;

		}

	},

	Number: {

		extends: 'AbstractType',

		_valid_value_regex: /^(\-|\+)?\d+(\.\d*)?$/,

		/**
		 * @param {*} value
		 * @returns {boolean}
		 */
		isValidValue: function(value) {

			return typeof(value) == 'number' && this._valid_value_regex.test(value);

		},

		isValidString: function(value) {

			return this._valid_value_regex.test(value);

		},

		fromSafeString: function(value) {

			return +value;

		}

	},

	Integer: {

		extends: 'Number',

		_valid_value_regex: /^(\-|\+)?\d+$/

	},

	PositiveInteger: {

		extends: 'Number',

		_valid_value_regex: /^\+?[1-9]\d*$/

	},

	NonNegativeInteger: {

		extends: 'Number',

		_valid_value_regex: /^\+?\d+$/

	},

	Percent: {

		extends: 'Number',

		_valid_value_regex: /^(0?\.\d+|1\.0+|0|1)$/,

		/**
		 * @param {*} value
		 * @returns {boolean}
		 */
		isValidValue: function(value) {

			return typeof(value) == 'number' && value >= 0 && value <=1;

		}

	},

	Set: {

		extends: 'AbstractType',

		/**
		 * @param {*} value
		 * @param descriptor
		 * @returns {boolean}
		 */
		isValidValue: function(value, descriptor) {

			if (Lava.schema.DEBUG && (!descriptor || !('allowed_values' in descriptor))) Lava.throw("Set type: missing allowed_values in schema");
			return descriptor['allowed_values'].indexOf(value) != -1;

		},

		isValidString: function(value, descriptor) {

			return this.isValidValue(value, descriptor);

		},

		fromSafeString: function(value) {

			return value;

		}

	},

	/**
	 * An HTML attribute which can take it's name as a value.
	 * Example:
	 * checked="checked"
	 * checked=""
	 */
	SwitchAttribute: {

		extends: 'AbstractType',

		/**
		 * @param {*} value
		 * @param descriptor
		 * @returns {boolean}
		 */
		isValidValue: function(value, descriptor) {

			return value === '' || value === descriptor.name;

		},

		isValidString: function(value, descriptor) {

			return this.isValidValue(value, descriptor);

		},

		fromSafeString: function() {

			return true;

		}

	},

	Map: {

		extends: 'AbstractType',

		/**
		 * @param {*} value
		 * @param descriptor
		 * @returns {boolean}
		 */
		isValidValue: function(value, descriptor) {

			if (Lava.schema.DEBUG && (!descriptor || !('value_map' in descriptor))) Lava.throw("Set type: missing allowed_values in schema");
			return (value in descriptor['value_map']);

		},

		isValidString: function(value, descriptor) {

			return this.isValidValue(value, descriptor);

		},

		fromSafeString: function(value, descriptor) {

			return descriptor['value_map'][value];

		}

	},

	Array: {

		extends: 'AbstractType',

		isValidValue: function(value) {

			return Array.isArray(value);

		},

		isValidString: function() {

			return false;

		},

		fromSafeString: function() {

			Lava.throw();

		}

	},

	Date: {

		extends: 'AbstractType',

		isValidValue: function(value) {

			return Firestorm.getType(value) == 'date';

		},

		isValidString: function() {

			return false; // will be implemented later

		},

		fromSafeString: function(value) {

			Lava.throw();

		}

	}

};

(function(types) {

	var name;

	function extendLavaType(type_object) {
		var base;
		if ('extends' in type_object) {
			base = types[type_object.extends];
			if (!base.is_extended) {
				extendLavaType(base);
			}
			Firestorm.implement(type_object, base);
		}
		type_object.is_extended = true;
	}

	for (name in types) {
		extendLavaType(types[name]);
		types[name].type_name = name;
	}

})(Lava.types);