<?php
/**
 * Router for WordPress development server
 * This file handles URL rewriting for WordPress
 */

$root = $_SERVER['DOCUMENT_ROOT'];
$path = $_SERVER['REQUEST_URI'];

// Remove query string from path
$path = strtok($path, '?');

// Handle static files (CSS, JS, images, etc.)
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/', $path)) {
    $file = $root . $path;
    if (file_exists($file) && is_file($file)) {
        // Set appropriate MIME type
        $mime_types = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'ico' => 'image/x-icon',
            'svg' => 'image/svg+xml',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject'
        ];
        
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        if (isset($mime_types[$ext])) {
            header('Content-Type: ' . $mime_types[$ext]);
        }
        
        readfile($file);
        return true;
    }
}

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
