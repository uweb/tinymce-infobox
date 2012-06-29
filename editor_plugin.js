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
      //jQuery is being packed in here since it simplifies everything immensely 
			ed.addButton('uwinfobox', {
				title : 'Make an InfoBox',
        image : url + '/inset-box.gif', 
        onclick : function() { 
          ed.focus(); 
          var max = 200
            , selection = ed.selection.getContent()
            , node = ed.selection.getNode()
            , $box  = jQuery(ed.selection.getNode()).closest('div.info-box');

          $box.removeClass('info-box-large');
          if( $box.length > 0 ) {
              $box.replaceWith($box.html());
              if($box.html().length > max) $box.addClass('info-box-large');
          } else {
            if( selection.length < 1 ) return;
            var classes = ed.selection.getContent().length > max ? 'info-box info-box-large' : 'info-box'
            ed.selection.setContent('<div class="'+ classes +'">' + ed.selection.getContent() + '</div>');
          }
        }
			});

      ed.onNodeChange.add(function(ed, cm, n) {
         cm.setActive('uwinfobox', jQuery(n).closest('.info-box').length > 0) 
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

