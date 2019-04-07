<?php
get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 <?php echo (is_active_sidebar('global-sidebar') ? 'col-sm-9' : ''); ?>">
<?php
    if (have_posts()):
        while(have_posts()): the_post();
            get_template_part('template-parts/content', get_post_format());
        endwhile;
    endif;
?>
                </div>

<?php   if (is_active_sidebar( 'global-sidebar' )): ?>
                <div class="col-xs-12 col-sm-3">
<?php get_sidebar(); ?>
                </div>
<?php   endif;  ?>

            </div>
        </div>
    </main>
</div>

<?php get_footer(); ?>