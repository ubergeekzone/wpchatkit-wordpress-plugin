<?php
/**
 * Plugin Name:       WP Chatkit
 * Plugin URI:        https://fullturnweb.com/plugins/wpchatkit
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Amy Bridges
 * Author URI:        https://fullturnweb.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wpchatkit
 */

define( 'WPCHATKIT_VERSION', '1.0.0' );

add_action( 'wp_enqueue_scripts', 'wpchatkit_load' );
function wpchatkit_load(){
  wp_enqueue_style( 'tailwind-css-wpchatkit', '//unpkg.com/tailwindcss@^2/dist/tailwind.min.css' );
  wp_enqueue_style( 'emojionearea-css-wpchatkit', '//cdnjs.cloudflare.com/ajax/libs/emojionearea/3.4.2/emojionearea.min.css');
  wp_enqueue_script( 'socketio-wpchatkit', '//cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js', null, "", true);
  wp_enqueue_script( 'emojionearea-wpchatkit', '//cdnjs.cloudflare.com/ajax/libs/emojionearea/3.4.2/emojionearea.min.js', null, "", true);
  wp_enqueue_script( 'wpchatkit-core-js', '//wp-chatkit.herokuapp.com/assets/js/chat.js', null, "", true);
  wp_enqueue_script( 'wpchatkit-js', plugin_dir_url( __FILE__ ) . '/wpchatkit.js', array( 'jquery', 'socketio-wpchatkit', 'emojionearea-wpchatkit' ), "", true);
}