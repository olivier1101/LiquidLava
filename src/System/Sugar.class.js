
Lava.define(
'Lava.system.Sugar',
/**
 * @lends Lava.system.Sugar#
 */
{

	_root_map: {
		include: '_parseInclude',
		storage: '_parseStorage',
		union: '_parseUnion',
		storage_object: '_parseStorageObject'
	},

	_union_handlers: {
		include: '_parseInclude'
	},

	/**
	 * The types of attributes that can be on root object, type => handler_name
	 */
	_root_attributes_handlers: {
		expression_option: '_parseRootExpressionOptionAttribute',
		targets_option: '_parseRootTargetsOptionAttribute',
		property: '_parseRootPropertyAttribute',
		'switch': '_parseRootSwitchAttribute',
		option: '_parseRootOptionAttribute',
		id: '_parseRootIdAttribute'
	},

	/**
	 * @param {_cSugar} schema
	 * @param {_cRawTag} raw_tag
	 * @param {_cWidget} widget_config
	 */
	parse: function(schema, raw_tag, widget_config) {

		var tags;

		if (raw_tag.content) {

			// Lava.isVoidTag is a workaround for <x:attach_directives>
			if (Lava.isVoidTag(raw_tag.name) || !schema.content_schema) {

				tags = Lava.parsers.Common.asBlocks(raw_tag.content);
				tags = this._applyTopDirectives(tags, widget_config);
				if (Lava.schema.DEBUG && tags.length) Lava.t("Widget is not allowed to have any content: " + raw_tag.name);

			} else {

				if (Lava.schema.DEBUG && !(schema.content_schema.type in this._root_map)) Lava.t("Unknown type of content in sugar: " + schema.content_schema.type);
				this[this._root_map[schema.content_schema.type]](schema.content_schema, raw_tag, widget_config, schema.content_schema.name);

			}

		}

		if (raw_tag.attributes) {

			this._parseRootAttributes(schema, raw_tag, widget_config);

		}

	},

	/**
	 * @param {_tRawTemplate} raw_blocks
	 * @param {_cWidget} widget_config
	 * @returns {_tRawTemplate}
	 */
	_applyTopDirectives: function(raw_blocks, widget_config) {

		var i = 0,
			count = raw_blocks.length,
			result = [];

		for (; i < count; i++) {

			if (raw_blocks[i].type == 'directive') {
				if (Lava.parsers.Directives.processDirective(raw_blocks[i], widget_config, true)) Lava.t("Directive inside sugar has returned a value: " + raw_blocks[i].name);
			} else {
				result = raw_blocks.slice(i);
				break;
			}

		}

		return result;

	},

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// root parsers

	/**
	 * @param content_schema
	 * @param raw_tag
	 * @param widget_config
	 */
	_parseInclude: function(content_schema, raw_tag, widget_config, name) {

		if (Lava.schema.DEBUG && !name) Lava.t('Sugar: name for include is not provided');
		Lava.store(
			widget_config,
			'includes',
			name,
			raw_tag.content ? Lava.parsers.Common.compileTemplate(raw_tag.content, widget_config) : []
		);

	},

	/**
	 * @param content_schema
	 * @param raw_tag
	 * @param widget_config
	 */
	_parseStorage: function(content_schema, raw_tag, widget_config) {

		var tags = Lava.parsers.Common.asBlocks(raw_tag.content);
		tags = this._applyTopDirectives(tags, widget_config);
		if (tags.length) {
			Lava.parsers.Storage.parse(widget_config, tags);
		}

	},

	/**
	 * @param {_cSugarContent} content_schema
	 * @param {_cRawTag} raw_tag
	 * @param {_cWidget} widget_config
	 */
	_parseUnion: function(content_schema, raw_tag, widget_config) {

		var tags = Lava.parsers.Common.asBlocks(raw_tag.content),
			i = 0,
			count,
			tag_roles_map = content_schema.tag_roles,
			tag_schema,
			storage_tags = [];

		tags = this._applyTopDirectives(tags, widget_config);
		count = tags.length;

		for (; i < count; i++) {

			if (tags[i].name in tag_roles_map) {

				tag_schema = tag_roles_map[tags[i].name];
				this[this._union_handlers[tag_schema.type]](tag_schema, tags[i], widget_config, tag_schema.name || tags[i].name);

			} else {

				storage_tags.push(tags[i]);

			}

		}

		if (storage_tags.length) {

			Lava.parsers.Storage.parse(widget_config, storage_tags);

		}

	},

	/**
	 * @param {_cSugarContent} content_schema
	 * @param {_cRawTag} raw_tag
	 * @param {_cWidget} widget_config
	 */
	_parseStorageObject: function(content_schema, raw_tag, widget_config) {

		if (raw_tag.content) {
			Lava.parsers.Storage.parse(widget_config, [{
				type: 'tag',
				name: content_schema.name,
				content: raw_tag.content
			}]);
		}

	},

	// end: root parsers
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * @param {_cSugar} schema
	 * @param {_cRawTag} raw_tag
	 * @param {_cWidget} widget_config
	 */
	_parseRootAttributes: function(schema, raw_tag, widget_config) {

		var name,
			descriptor,
			unknown_attributes = {};

		for (name in raw_tag.attributes) {

			if (Lava.schema.DEBUG && name != 'id' && !schema.attribute_mappings) Lava.t('Sugar schema is missing attribute mappings for: ' + name);

			descriptor = (name == 'id') ? {type: 'id'} : schema.attribute_mappings[name];

			if (descriptor) {
				this[this._root_attributes_handlers[descriptor.type]](widget_config, raw_tag.attributes[name], descriptor, descriptor.name || name);
			} else {
				unknown_attributes[name] = raw_tag.attributes[name];
			}

		}

		if (!Firestorm.Object.isEmpty(unknown_attributes)) {

			if (Lava.schema.DEBUG && !schema.root_resource_name) Lava.t("Sugar: unknown attribute: " + name + ", for widget: " + raw_tag.name);
			this._storeAttributesAsResource(widget_config, unknown_attributes, schema.root_resource_name);

		}

	},

	/**
	 * @param {_cWidget} widget_config
	 * @param {Object} unknown_attributes
	 * @param {string} resource_name
	 */
	_storeAttributesAsResource: function(widget_config, unknown_attributes, resource_name) {

		var value = {
				type: 'container_stack',
				value: []
			},
			operations_stack = value.value;

		if (!widget_config.resources) {

			widget_config.resources = {};

		}

		if (!widget_config.resources['default']) {

			widget_config.resources['default'] = {};

		}

		if ('class' in unknown_attributes) {

			operations_stack.push({
				name: 'static_classes',
				value: unknown_attributes['class'].trim().split(/\s+/)
			});
			delete unknown_attributes['class'];

		}

		if ('style' in unknown_attributes) {

			operations_stack.push({
				name: 'static_styles',
				value: Lava.parsers.Common.parseStyleAttribute(unknown_attributes.style)
			});
			delete  unknown_attributes.style;

		}

		if (!Firestorm.Object.isEmpty(unknown_attributes)) {

			operations_stack.push({
				name: 'static_properties',
				value: Firestorm.Object.copy(unknown_attributes) // copying to reduce possible slowdowns (object may contain deleted values)
			});

		}

		Lava.resources.putResourceValue(widget_config.resources['default'], resource_name, value);

	},

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// root attribute actions

	/**
	 * @param {_cWidget} widget_config
	 * @param {string} attribute_value
	 */
	_parseRootIdAttribute: function(widget_config, attribute_value) {

		if (Lava.schema.DEBUG && (!Lava.isValidId(attribute_value) || ('id' in widget_config))) Lava.t();
		widget_config.id = attribute_value;

	},

	/**
	 * @param {_cWidget} widget_config
	 * @param {string} attribute_value
	 * @param {_cSugarRootAttribute} descriptor
	 * @param {string} name
	 */
	_parseRootOptionAttribute: function(widget_config, attribute_value, descriptor, name) {

		Lava.store(widget_config, 'options', name, Lava.valueToType(descriptor, attribute_value));

	},

	/**
	 * Same as 'option', but empty value is treated as boolean TRUE, to allow value-less attributes.
	 * @param {_cWidget} widget_config
	 * @param {string} attribute_value
	 * @param {_cSugarRootAttribute} descriptor
	 * @param {string} name
	 */
	_parseRootSwitchAttribute: function(widget_config, attribute_value, descriptor, name) {

		Lava.store(widget_config, 'options',  name, (attribute_value == '') ? true : Lava.types.Boolean.fromString(attribute_value));

	},

	/**
	 * @param {_cWidget} widget_config
	 * @param {string} attribute_value
	 * @param {_cSugarRootAttribute} descriptor
	 * @param {string} name
	 */
	_parseRootPropertyAttribute: function(widget_config, attribute_value, descriptor, name) {

		Lava.store(widget_config, 'properties', name, Lava.valueToType(descriptor, attribute_value));

	},



	/**
	 * @param {_cWidget} widget_config
	 * @param {string} attribute_value
	 * @param {_cSugarRootAttribute} descriptor
	 * @param {string} name
	 */
	_parseRootTargetsOptionAttribute: function(widget_config, attribute_value, descriptor, name) {

		Lava.store(widget_config, 'options', name, Lava.parsers.Common.parseTargets(attribute_value));

	},

	/**
	 * @param {_cWidget} widget_config
	 * @param {string} attribute_value
	 * @param {_cSugarRootAttribute} descriptor
	 * @param {string} name
	 */
	_parseRootExpressionOptionAttribute: function(widget_config, attribute_value, descriptor, name) {

		Lava.store(
			widget_config,
			'options',
			name,
			Lava.ExpressionParser.parse(attribute_value, Lava.ExpressionParser.SEPARATORS.SEMICOLON)
		);

	}

	// end: root attribute actions
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});
