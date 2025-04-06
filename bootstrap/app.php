<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // Define routes for both API and Web
        api: __DIR__.'/../routes/api.php',
        web: __DIR__.'/../routes/web.php',  // Added web routes
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Apply API-specific middleware, but no Sanctum middleware
        $middleware->api(prepend: [
            // Removed Sanctum middleware
        ]);

        // Apply Web-specific middleware (sessions, cookies, etc.)
        $middleware->web(prepend: [
            \Illuminate\Session\Middleware\StartSession::class,  // Session middleware for web routes
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,  // Cookies
            \Illuminate\Cookie\Middleware\EncryptCookies::class,  // Encrypt cookies
            \Illuminate\Session\Middleware\AuthenticateSession::class,  // Session authentication
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Handle exceptions as necessary
    })
    ->create();
