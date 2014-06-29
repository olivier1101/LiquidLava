var package_content = {
	tabs: [
		{
			title: "Classes",
			content: "<pre><code class=\"hljs javascript\">Lava.ClassManager.define(\r\n<span class=\"hljs-string\">'Lava.widget.PanelExample1'</span>,\r\n<span class=\"hljs-comment\">/** @extends {Lavadoc.widget.Standard} */</span>\r\n{\r\n\r\n\tExtends: <span class=\"hljs-string\">'Lava.widget.Standard'</span>,\r\n\r\n\tname: <span class=\"hljs-string\">'example_panel'</span>,\r\n\r\n\t_properties: {\r\n\t\tis_expanded: <span class=\"hljs-literal\">true</span>\r\n\t},\r\n\r\n\t_event_handlers: {\r\n\t\ttoggle_click: <span class=\"hljs-string\">'_onToggleClick'</span>\r\n\t},\r\n\r\n\t_onToggleClick: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span><span class=\"hljs-params\">(dom_event_name, dom_event, view, template_arguments)</span> {</span>\r\n\r\n\t\t<div data-tooltip=\"The only significant line of code\" class=\"lava-highlight\"></span><span class=\"hljs-keyword\">this</span>.set(<span class=\"hljs-string\">'is_expanded'</span>, !<span class=\"hljs-keyword\">this</span>.get(<span class=\"hljs-string\">'is_expanded'</span>));<span class=\"hljs-comment\"></div>\r\n\r\n\t}\r\n\r\n});</code></pre>"
		},
		{
			title: "Template",
			content: "<pre><code class=\"hljs xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">example</span>&gt;</span>\r\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">x:widget</span> <span class=\"hljs-attribute\">controller</span>=<span class=\"hljs-value\">\"PanelExample1\"</span>&gt;</span>\r\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">template</span> <span class=\"hljs-attribute\">role</span>=<span class=\"hljs-value\">\"main\"</span>&gt;</span>\r\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">div</span> <span class=\"lava-control-prefix\">x</span><span class=\"hljs-attribute\">:type</span>=<span class=\"hljs-value\">\"view\"</span>\r\n          <span class=\"lava-control-prefix\">x</span><span class=\"hljs-attribute\">:event:click</span>=<span class=\"hljs-value\">\"$example_panel.toggle_click\"</span>\r\n          <span class=\"hljs-attribute\">style</span>=<span class=\"hljs-value\">\"background: lightyellow; padding: 1em; border: 1px solid gray;\"</span>&gt;</span>\r\n        Click me!\r\n      <span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">div</span>&gt;</span>\r\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">div</span> <span class=\"lava-control-prefix\">x</span><span class=\"hljs-attribute\">:type</span>=<span class=\"hljs-value\">\"view\"</span>\r\n        <span class=\"lava-control-prefix\">x</span><span class=\"hljs-attribute\">:style:display</span>=<span class=\"hljs-value\">\"is_expanded ? 'block' : 'none'\"</span>\r\n        <span class=\"hljs-attribute\">style</span>=<span class=\"hljs-value\">\"border: 1px solid black\"</span>&gt;</span>\r\n          test<span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">br</span>/&gt;</span>\r\n          test<span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">br</span>/&gt;</span>\r\n          test<span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">br</span>/&gt;</span>\r\n          test<span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">br</span>/&gt;</span>\r\n      <span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">div</span>&gt;</span>\r\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">template</span>&gt;</span>\r\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">default_events</span>&gt;</span>['click']<span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">default_events</span>&gt;</span>\r\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">x:widget</span>&gt;</span>\r\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">example</span>&gt;</span></code></pre>"
		}
	],
	classes: "Lava.ClassManager.define(\r\n'Lava.widget.PanelExample1',\r\n/** @extends {Lavadoc.widget.Standard} */\r\n{\r\n\r\n\tExtends: 'Lava.widget.Standard',\r\n\r\n\tname: 'example_panel',\r\n\r\n\t_properties: {\r\n\t\tis_expanded: true\r\n\t},\r\n\r\n\t_event_handlers: {\r\n\t\ttoggle_click: '_onToggleClick'\r\n\t},\r\n\r\n\t_onToggleClick: function(dom_event_name, dom_event, view, template_arguments) {\r\n\r\n\t\t/*H:The only significant line of code*/this.set('is_expanded', !this.get('is_expanded'));/*:H*/\r\n\r\n\t}\r\n\r\n});",
	template: [
		"<p>A very simple databinding demo. The click listener changes the <i>is_expanded</i> widget property,\r\n\twhich is bound to the style of the panel.</p>",
		{
			type: "widget",
			class: "Lava.WidgetConfigExtensionGateway",
			extender_type: "Default",
			extends: "Example",
			includes: {
				content: [
					"\r\n\t",
					{
						type: "widget",
						class: "Lava.WidgetConfigExtensionGateway",
						extender_type: "Default",
						template: [
							"\r\n\t\t\t",
							{
								type: "view",
								class: "View",
								container: {
									class: "Element",
									tag_name: "div",
									static_styles: {
										background: "lightyellow",
										padding: "1em",
										border: "1px solid gray"
									},
									events: {
										click: [{
											locator_type: "Name",
											locator: "example_panel",
											name: "toggle_click"
										}]
									}
								},
								template: ["\r\n\t\t\t\tClick me!\r\n\t\t\t"]
							},
							"\r\n\t\t\t",
							{
								type: "view",
								class: "View",
								container: {
									class: "Element",
									tag_name: "div",
									static_styles: {border: "1px solid black"},
									style_bindings: {
										display: {
											evaluator: function() {
return (this._binds[0].getValue() ? 'block' : 'none');
},
											flags: {
												hasModifiers: false,
												hasActiveModifiers: false,
												isScopeEval: false,
												isStatic: false,
												isLiteral: false,
												isNumber: false,
												isString: false
											},
											binds: [{property_name: "is_expanded"}],
											modifiers: [],
											active_modifiers: []
										}
									}
								},
								template: ["\r\n\t\t\t\t\ttest<br/>\r\n\t\t\t\t\ttest<br/>\r\n\t\t\t\t\ttest<br/>\r\n\t\t\t\t\ttest<br/>\r\n\t\t\t"]
							},
							"\r\n\t\t"
						],
						real_class: "PanelExample1"
					},
					"\r\n"
				]
			}
		}
	]
}