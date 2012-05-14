(function() {
	tinymce.create('tinymce.plugins.UWInfoBox', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {

			// Register example button
			ed.addButton('uwinfobox', {
				title : 'Make an InfoBox',
        image : 'MyCoolBtn.png', 
        onclick : function(a,b,c,d,e) { 
          ed.focus(); 
          var selection = ed.selection.getContent();
          var node = ed.selection.getNode();
          // [TODO] do this without jquery using the tiny api
          var $box = jQuery(ed.selection.getNode()).closest('div.info-box');
          if( $box.length > 0 ) {
              $box.replaceWith($box.html());
          } else {
            if( selection.length < 1 ) return;
            ed.selection.setContent('<div class="info-box">' + ed.selection.getContent() + '</div>');
          }
        }
			});


			ed.onNodeChange.add(function(ed, cm, n, co) {
        //[TODO] set image to active state when inside an infobox
        //jQuery(ed.selection.getNode()).closest('div.info-box').length > 0
        //tinyMCE.activeEditor.controlManager.get('link').setDisabled(false)
			});
		},
		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'UW InfoBox',
				author : 'Dane Odekirk',
				authorurl : 'daneodekirk.com',
				infourl : '',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('uwinfobox', tinymce.plugins.UWInfoBox);
})();

