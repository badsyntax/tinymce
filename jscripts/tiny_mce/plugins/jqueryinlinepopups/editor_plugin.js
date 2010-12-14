/**
 * editor_plugin_src.js
 */

(function() {
	var DOM = tinymce.DOM, Element = tinymce.dom.Element, Event = tinymce.dom.Event, each = tinymce.each, is = tinymce.is;

	tinymce.create('tinymce.plugins.jQueryInlinePopups', {
		init : function(ed, url) {
			// Replace window manager
			ed.onBeforeRenderUI.add(function() {
				ed.windowManager = new tinymce.InlineWindowManager(ed);
				DOM.loadCSS(url + '/skins/' + (ed.settings.jqueryinlinepopups_skin || 'clearlooks2') + "/window.css");
			});
		},

		getInfo : function() {
			return {
				longname : 'jQueryInlinePopups',
				author : 'Richard Willis',
				authorurl : 'http://badsyntax.co.uk',
				infourl : '',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	tinymce.create('tinymce.InlineWindowManager:tinymce.WindowManager', {
		InlineWindowManager : function(ed) {
			var t = this;

			t.parent(ed);
			t.zIndex = 300000;
			t.count = 0;
			t.windows = {};
		},

		open : function(f, p) {

			var 
				t = this,
				id = DOM.uniqueId(),
				vp = DOM.getViewPort(),
				w,
				dialog = $( '<div />' ).attr( 'id', 'dialog-' + id )
					.hide()
					.appendTo('body'),
				iframe = $( '<iframe />', { id: id })
					.css({ 
						width: f.width,
						height: f.height
					})
					.load(function(){

					})
					.appendTo(dialog)
					.attr( 'src', f.url || f.file );
					
					f = f || {};
					p = p || {};

					// Run native windows
					if (!f.inline)
						return t.parent(f, p);
					
			this.features = f;
			this.params = p;
			this.onOpen.dispatch(this, f, p);
			
			dialog.dialog({
				title: f.title || '',
				width: f.width + 1,
				height: f.height + 25,
				modal: true,
				resizable: false,
				draggable: true,
				dialogClass: 'ui-dialog-tinymce'
			});
			
			this.dialog = dialog;
			
			// Add window
			w = t.windows[id] = {
				id : id,
				features : f
			};			
			
			t.count++;

			return w;
		},

		close : function(win, id) {
			
			this.dialog.dialog('close');
		},

		setTitle : function(w, ti) {
			var e;

			w = this._findId(w);

			if (e = DOM.get(w + '_title'))
				e.innerHTML = DOM.encode(ti);
		},

		alert : function(txt, cb, s) {
			var t = this, w;

			w = t.open({
				title : t,
				type : 'alert',
				button_func : function(s) {
					if (cb)
						cb.call(s || t, s);

					t.close(null, w.id);
				},
				content : DOM.encode(t.editor.getLang(txt, txt)),
				inline : 1,
				width : 400,
				height : 130
			});
		},

		confirm : function(txt, cb, s) {
			var t = this, w;

			w = t.open({
				title : t,
				type : 'confirm',
				button_func : function(s) {
					if (cb)
						cb.call(s || t, s);

					t.close(null, w.id);
				},
				content : DOM.encode(t.editor.getLang(txt, txt)),
				inline : 1,
				width : 400,
				height : 130
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('jqueryinlinepopups', tinymce.plugins.jQueryInlinePopups);
})();


