<?php

/**
 * Plugin Name: Paw Masonry Gallery
 * Author: WPPaw
 * Description: The fastest and easiest way to create a responsive masonry gallery.
 * Version: 1.0.0
 * Text Domain: paw-masonry-gallery
 * License: GPL2
 */

// Exit if accessed directly
if (!defined('ABSPATH')) exit;

/**
 * Main plugin class
 *
 */
class PawMasonryGallery
{

    private static $instance;

    public $assets;

    public static function instance()
    {

        if (!isset(self::$instance) && !(self::$instance instanceof PawMasonryGallery))
            self::$instance = new PawMasonryGallery;

        return self::$instance;
    }

    public function __construct()
    {
        define('PMG_VERSION',            '1.0.0');
        define('PMG_BASENAME',         plugin_basename(__FILE__));
        define('PMG_PLUGIN_DIR',        plugin_dir_path(__FILE__));
        define('PMG_PLUGIN_DIR_URL',  plugin_dir_url(__FILE__));

        $this->assets = json_decode(file_get_contents(PMG_PLUGIN_DIR . 'assets/mix-manifest.json'), true);

        add_action('divi_extensions_init', [$this, 'pmg_init']);
        add_action('wp_enqueue_scripts', [$this, 'register_frontend_scripts']);
        add_action('wp_enqueue_scripts', [$this, 'register_builder_scripts'], 99);
        // add_filter('plugin_action_links_' . PMG_BASENAME, array($this, 'add_plugin_action_links'));
    }

    public function register_frontend_scripts()
    {
        wp_register_script(
            'pmg-masonry',
            PMG_PLUGIN_DIR_URL . 'assets/js/masonry.min.js',
            ['jquery'],
            PMG_VERSION,
            true
        );

        wp_register_script(
            'pmg-frontend',
            PMG_PLUGIN_DIR_URL . 'assets' . $this->assets['/js/frontend.js'],
            ['jquery', 'pmg-masonry'],
            PMG_VERSION,
            true
        );

        wp_register_style(
            'pmg-frontend',
            PMG_PLUGIN_DIR_URL . 'assets' . $this->assets['/css/frontend.css'],
            [],
            PMG_VERSION,
            false
        );
    }

    public function register_builder_scripts()
    {

        if (!et_core_is_fb_enabled()) {
            return;
        }

        wp_enqueue_script(
            'pmg-bundle',
            PMG_PLUGIN_DIR_URL . 'assets' . $this->assets['/js/bundle.js'],
            ['react-dom', 'react', 'pmg-frontend'],
            PMG_VERSION,
            true
        );

        wp_enqueue_style(
            'pmg-bundle',
            PMG_PLUGIN_DIR_URL . 'assets' . $this->assets['/css/bundle.css'],
            [],
            PMG_VERSION
        );
    }

    public function pmg_init()
    {
        require_once PMG_PLUGIN_DIR . '/includes/extension.php';
    }

    public function add_plugin_action_links($links)
    {
        $links[] = '<a href="https://progallery.wppaw.com/" target="_blank" style="color: #f84f8d;">' . __('Upgrade', 'paw-masonry-gallery') . '</a>';
        return $links;
    }
}


function paw_masonry_gallery()
{
    return PawMasonryGallery::instance();
}

paw_masonry_gallery();
