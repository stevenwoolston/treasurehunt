<?php

/*
@package: wwd blankslate
*/
require get_template_directory() . '/inc/theme-support.php';

function wwd_load_scripts() {
    wp_deregister_script('jquery');
    wp_register_script('jquery', get_template_directory_uri() . '/js/jquery-3.3.1.min.js', false, '3.3.1', true);
    wp_enqueue_style('bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css', array(), '3.3.7', 'all');
    wp_enqueue_style('wwd-blankslate', get_template_directory_uri() . '/css/style.min.css', array(), '1.0.0', 'all');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css?family=Open+Sans|Roboto', array(), '1.0', 'all');

    wp_enqueue_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', array('jquery'), '3.3.7', true);
}
add_action('wp_enqueue_scripts', 'wwd_load_scripts');
