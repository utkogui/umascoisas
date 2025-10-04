<?php
/**
 * Router for WordPress development server
 * This file handles URL rewriting for WordPress
 */

$root = $_SERVER['DOCUMENT_ROOT'];
$path = $_SERVER['REQUEST_URI'];

// Remove query string from path
$path = strtok($path, '?');

// If it's a file that exists, serve it directly
if (file_exists($root . $path) && is_file($root . $path)) {
    return false;
}

// If it's a directory, try to serve index.php
if (is_dir($root . $path)) {
    $index = $root . $path . '/index.php';
    if (file_exists($index)) {
        require $index;
        return true;
    }
}

// For all other requests, serve WordPress
require $root . '/index.php';
