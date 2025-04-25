<?php
// ** Database settings - 请根据实际情况修改 ** //
define('DB_NAME', 'game_site');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// ** 安全密钥和盐 ** //
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

$table_prefix = 'wp_';

// ** WordPress 数据库的名称 ** //
define('WP_DEBUG', false);

// ** 绝对路径 ** //
if ( ! defined('ABSPATH') ) {
    define('ABSPATH', __DIR__ . '/');
}

// ** 设置 WordPress 变量和包含文件 ** //
require_once ABSPATH . 'wp-settings.php'; 