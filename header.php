<?php

/*
@package: wwd blankslate
*/

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<?php
    $options = get_option('wwd-plugin');
    $ga_option = $options['seo']['google_analytics_tracking_code'];
    $meta_description = $options['seo']['meta_description'];

    if ( is_single() ) {
        $meta_description = $meta_description . ' ' . ($post->post_title) . ' ' . 
            preg_replace( "/\r|\n/", " ", ( strip_tags($post->post_excerpt ) ) );
    }
?>
    <meta name="description" content="<?php echo $meta_description; ?>">
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
<?php if (is_singular() && pings_open(get_queried_object())) : ?>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
<?php endif; ?>
    <title><?php
    if ( is_404() ) {
        echo "Nothing Found";
    } else if ( !is_home() ) {
        echo wp_title("-", false, "left") . " - ";
        echo bloginfo("description");
    } else {
        echo bloginfo("name") . " - " . $meta_description;
    }
?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="header-container bg-image-cover" style="background-image: url(<?php header_image(); ?>);">
<?php
    if (has_custom_logo()):
?>
    <div class="clearfix blog-info-container">
        <div class="blog-info-logo pull-left">
            <?php the_custom_logo(); ?>
        </div>
        <div class="blog-info-text-container pull-left">
            <h1><?php bloginfo('name'); ?></h1>
            <h2><?php bloginfo('description'); ?></h2>
        </div>
    </div>
<?php
    else:
?>
    <div class="blog-info-text-container">
        <h1><?php bloginfo('name'); ?></h1>
        <h2><?php bloginfo('description'); ?></h2>
    </div>
<?php
    endif;
?>
    <div class="nav-container">
        <nav class="navbar navbar-default navbar-wwd">
        <?php 
            wp_nav_menu( 
                array(
                    'theme_location' => 'primary',
                    'container' => 'false',
                    'menu_class' => 'nav navbar-nav'
                )
            );
        ?>
        </nav>
    </div>
</header>