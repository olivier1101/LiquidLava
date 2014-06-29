var package_content = {
	tabs: [
		{
			title: "Classes",
			content: "<pre><code class=\"hljs javascript\">Lava.ClassManager.define(\r\n<span class=\"hljs-string\">'Lava.widget.DemoCalendar'</span>,\r\n{\r\n\tExtends: <span class=\"hljs-string\">'Lava.widget.Calendar'</span>,\r\n\r\n\t_refreshData: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span><span class=\"hljs-params\">()</span> {</span>\r\n\r\n\t\t<span class=\"hljs-keyword\">var</span> locale_object = Lava.locales[Lava.schema.LOCALE],\r\n\t\t\tmonth_data = <span class=\"hljs-keyword\">this</span>._getMonthData(<span class=\"hljs-keyword\">this</span>._properties._displayed_year, <span class=\"hljs-keyword\">this</span>._properties._displayed_month);\r\n\r\n\t\t<span class=\"hljs-keyword\">var</span> prev_month_data = <span class=\"hljs-keyword\">this</span>._properties._displayed_month == <span class=\"hljs-number\">0</span>\r\n\t\t\t? <span class=\"hljs-keyword\">this</span>._getMonthData(<span class=\"hljs-keyword\">this</span>._properties._displayed_year - <span class=\"hljs-number\">1</span>, <span class=\"hljs-number\">11</span>)\r\n\t\t\t: <span class=\"hljs-keyword\">this</span>._getMonthData(<span class=\"hljs-keyword\">this</span>._properties._displayed_year, <span class=\"hljs-keyword\">this</span>._properties._displayed_month - <span class=\"hljs-number\">1</span>);\r\n\r\n\t\t<span class=\"hljs-keyword\">var</span> next_month_data = <span class=\"hljs-keyword\">this</span>._properties._displayed_month == <span class=\"hljs-number\">11</span>\r\n\t\t\t? <span class=\"hljs-keyword\">this</span>._getMonthData(<span class=\"hljs-keyword\">this</span>._properties._displayed_year + <span class=\"hljs-number\">1</span>, <span class=\"hljs-number\">0</span>)\r\n\t\t\t: <span class=\"hljs-keyword\">this</span>._getMonthData(<span class=\"hljs-keyword\">this</span>._properties._displayed_year, <span class=\"hljs-keyword\">this</span>._properties._displayed_month + <span class=\"hljs-number\">1</span>);\r\n\r\n\t\t<span class=\"hljs-keyword\">this</span>.set(<span class=\"hljs-string\">'_months'</span>, [prev_month_data, month_data, next_month_data]);\r\n\r\n\t\t<span class=\"hljs-comment\">// Formatting by hands, cause in future there may be added a possibility to set locale in options</span>\r\n\t\t<span class=\"hljs-keyword\">this</span>.set(\r\n\t\t\t<span class=\"hljs-string\">'_month_year_string'</span>,\r\n\t\t\tlocale_object.month_names[<span class=\"hljs-keyword\">this</span>._properties._displayed_month] + <span class=\"hljs-string\">' '</span> + <span class=\"hljs-keyword\">this</span>._properties._displayed_year\r\n\t\t);\r\n\r\n\t}\r\n});</code></pre>"
		},
		{
			title: "Template",
			content: "<pre><code class=\"hljs xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">example</span>&gt;</span>\r\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-title\">x:widget</span> <span class=\"hljs-attribute\">extends</span>=<span class=\"hljs-value\">\"Calendar\"</span> <span class=\"hljs-attribute\">controller</span>=<span class=\"hljs-value\">\"DemoCalendar\"</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">x:widget</span>&gt;</span>\r\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-title\">example</span>&gt;</span>\r\n</code></pre>"
		}
	],
	classes: "Lava.ClassManager.define(\r\n'Lava.widget.DemoCalendar',\r\n{\r\n\tExtends: 'Lava.widget.Calendar',\r\n\r\n\t_refreshData: function() {\r\n\r\n\t\tvar locale_object = Lava.locales[Lava.schema.LOCALE],\r\n\t\t\tmonth_data = this._getMonthData(this._properties._displayed_year, this._properties._displayed_month);\r\n\r\n\t\tvar prev_month_data = this._properties._displayed_month == 0\r\n\t\t\t? this._getMonthData(this._properties._displayed_year - 1, 11)\r\n\t\t\t: this._getMonthData(this._properties._displayed_year, this._properties._displayed_month - 1);\r\n\r\n\t\tvar next_month_data = this._properties._displayed_month == 11\r\n\t\t\t? this._getMonthData(this._properties._displayed_year + 1, 0)\r\n\t\t\t: this._getMonthData(this._properties._displayed_year, this._properties._displayed_month + 1);\r\n\r\n\t\tthis.set('_months', [prev_month_data, month_data, next_month_data]);\r\n\r\n\t\t// Formatting by hands, cause in future there may be added a possibility to set locale in options\r\n\t\tthis.set(\r\n\t\t\t'_month_year_string',\r\n\t\t\tlocale_object.month_names[this._properties._displayed_month] + ' ' + this._properties._displayed_year\r\n\t\t);\r\n\r\n\t}\r\n});",
	template: [
		"<p>This example demonstrates the simplicity of Lava widgets.\r\n\tYou can add previous and next months to the calendar by modifying just one function</p>\r\n<p>This demo is not very usable, so in your own project you will also want to modify the template to display month names,\r\nand hide days that are gray by default.</p>",
		{
			type: "widget",
			class: "Lava.WidgetConfigExtensionGateway",
			extender_type: "Default",
			extends: "Example",
			includes: {
				content: [
					"\r\n\t",
					{
						real_class: "DemoCalendar",
						extends: "Calendar",
						class: "Lava.WidgetConfigExtensionGateway",
						extender_type: "Default",
						type: "widget"
					},
					"\r\n"
				]
			}
		},
		"\r\n"
	]
}