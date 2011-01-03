(function() {

	tinymce.create('tinymce.plugins.KOassets', {

		init : function(ed, url) {

			ed.addCommand('mceKOassets', function() {

				ed.windowManager.open({
					file : ed.settings.file_browser_url,
					title: 'Asset Manager',
					width : 680,
					height : 462,
					inline: 1,
					popup_css : false
				},
				{
					plugin_url : url
				});
			});

			// register asset manager button
			ed.addButton('koassets', {
				title : 'Insert/edit asset',
				cmd : 'mceKOassets',
				image : url + '/img/images.png'
			});
		},

		getInfo : function() {
			return {
				longname : 'Asset Manager',
				author : 'Richard Willis',
				authorurl : 'http://badsyntax.co',
				infourl : 'http://github.com/badsyntax',
				version : "0.1"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('koassets', tinymce.plugins.KOassets);
})();
