<?php

/*
@package: wwd blankslate
*/

?>
<footer></footer>
<?php wp_footer(); ?>
<?php   
    $options = get_option('wwd-plugin');
    $ga_option = $options['seo']['google_analytics_tracking_code'];

    if ( $ga_option != "" ) : ?>
    <!-- Global Site Tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo $ga_option; ?>"></script>
    <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());

          gtag('config', '<?php echo $ga_option; ?>');
    </script>
<?php   endif ?>

</body>
</html>