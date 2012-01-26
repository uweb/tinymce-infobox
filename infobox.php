<?php
/**
Plugin Name: UW InfoBox
Plugin URI: uw.edu
Description: Adds infobox style to tinymce editor
Author: Dane Odekirk
Version: 0.1
Author URI: http://daneodekirk.com
*/

if ( !class_exists( "UWInfoBox" ) ) 
{
    class UWInfoBox
    {
        function UWInfoBox( ) 
        {
           // Auth only
             //if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) )
              // return;

            // Add only in Rich Editor mode
            //if ( get_user_option( 'rich_editing' ) == 'true') {
                add_action( 'init' , array( &$this , 'initialize' ) );
            //}
           //echo URLPATH . 'tinymce/editor_plugin.js';

        }

        function initialize ( )
        {
            add_filter( "mce_external_plugins" , array( &$this, "add_infobox_to_tinymce" ) );
            add_filter( 'mce_buttons' , array( &$this, 'register_infobox_button' ) );
            add_filter( 'mce_css' , array(&$this, 'add_infobox_css' ) );
        }

        function add_infobox_css( $mce_css ) 
        {
            if (! empty($mce_css)) $mce_css .= ',';
            $mce_css .= plugins_url( 'infobox.css?' . time() , __FILE__ );
            return $mce_css; 
        }
        

        function register_infobox_button ( $buttons ) 
        {
           array_push( $buttons, "|", "uwinfobox" );
           return $buttons;
        }
         
        function add_infobox_to_tinymce ( $plugin_array ) 
        {
           $plugin_array[ 'uwinfobox' ] = plugins_url( 'editor_plugin.js' , __FILE__);
           return $plugin_array;
        }
  
    }

    new UWInfoBox;

}


?>
