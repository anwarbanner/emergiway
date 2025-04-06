<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UtilisateurController;
use Illuminate\Support\Facades\Route;

// Define the routes inside the api middleware group (without Sanctum middleware)
Route::middleware('api')->group(function () {
    // Welcome route
    Route::get('/', function () {
        return response()->json([
            'message' => 'Welcome to the API',
            'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    // Utilisateur Routes
    Route::get('/utilisateur', [UtilisateurController::class, 'index']);
    Route::post('/utilisateur', [UtilisateurController::class, 'saveutilisateur']);
    Route::get('/utilisateur/{id}', [UtilisateurController::class, 'edit']);
    Route::put('/utilisateur/{id}', [UtilisateurController::class, 'update']);
    Route::delete('/utilisateur/{id}', [UtilisateurController::class, 'destroy']);
});
