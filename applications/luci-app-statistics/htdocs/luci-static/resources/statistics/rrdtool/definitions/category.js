/* Licensed to the public under the Apache License 2.0. */

'use strict';
'require baseclass';
'require uci';

return baseclass.extend({
	title: _('Category'),

	rrdargs: function(graph, host, plugin, plugin_instance, dtype) {
		var p = [];

		var title = "%H: Traffic usage";

		if (plugin_instance != '')
			title = "Category: %pi";

		/* 
			Todo: use uci to get the interface names and use them to replace 
			the hardcoded eth1 and 3g_wwan in all of the below 
			Example:
			var interface_name = uci.get("network", "wan", "device");
		*/
		var data_instances = graph.dataInstances(host, plugin, plugin_instance, "if_octets").sort();

		var show_3g_wwan = (-1 != data_instances.indexOf("3g_wwan"));
		var show_eth1 = (-1 != data_instances.indexOf("eth1"));

		var if_octets = {
			title: title,
			y_min: "0",
			alt_autoscale_max: true,
			vlabel: "Bytes/s",
			data: {
				instances: {
					if_octets: [ 
						(show_3g_wwan ? ["3g_wwan"] : []), 
						(show_eth1 ? ["eth1"] : [])
					]
				},
				sources: {
					if_octets: [ "tx", "rx" ],
					if_octets: [ "tx", "rx" ]
				},
				options: {
					if_octets_eth1_tx: {
						total: true,		
						color: "0000ff",	/* eth1 is blue */
						title: "Viasat Bytes (TX)"
					},
					if_octets_eth1_rx: {
						flip : true,		/* flip rx line */
						total: true,	
						color: "0000ff",	/* eth1 is blue */
						title: "Viasat Bytes (RX)"
					},

					if_octets_3g_wwan_tx: {
						total: true,	
						color: "00ff00",	/* 3g_wwan is green */
						title: "TMobile LTEBytes (TX)"
					},
					if_octets_3g_wwan_rx: {
						flip : true,		/* flip rx line */
						total: true,		
						color: "00ff00",	/* 3g_wwan is green */
						title: "TMobile LTEBytes (RX)"
					}
				}
			}
		};

		var types = graph.dataTypes(host, plugin, plugin_instance);

		for (var i = 0; i < types.length; i++)
			if (types[i] == 'if_octets')
				p.push(if_octets);
			// else if (types[i] == 'total_bytes')
			// 	p.push(total_bytes);

		return p;
	}
});
