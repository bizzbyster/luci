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

		var if_octets = {
			title: title,
			y_min: "0",
			alt_autoscale_max: true,
			vlabel: "Bytes/s",
			data: {
				instances: {
					if_octets: graph.dataInstances(host, plugin, plugin_instance, "if_octets")
				},
				sources: {
					if_octets: [ "tx", "rx" ],
					if_octets: [ "tx", "rx" ]
				},
				options: {
					if_octets_eth1_tx: {
						flip : true,		/* flip upload line */
						total: true,		
						color: "0000ff",	/* eth1 is blue */
						title: "Viasat Bytes (Upload)"
					},
					if_octets_eth1_rx: {
						total: true,	
						color: "0000ff",	/* eth1 is blue */
						title: "Viasat Bytes (Download)"
					},

					if_octets_3g_wwan_tx: {
						flip : true,		/* flip upload line */
						total: true,	
						color: "00ff00",	/* 3g_wwan is green */
						title: "TMobile LTEBytes (Upload)"
					},
					if_octets_3g_wwan_rx: {
						total: true,		
						color: "00ff00",	/* 3g_wwan is green */
						title: "TMobile LTEBytes (Download)"
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
