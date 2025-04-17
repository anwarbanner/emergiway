<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\Utilisateur;
use App\Http\Controllers\UtilisateurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Simple welcome test route
Route::get('/', function () {
    return response()->json([
        'message' => 'Bienvenue à l\'API Laravel',
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
});

// 🔐 LOGIN Route (No CSRF, no tokens — for Java mobile app)
Route::post('/utilisateur/login', function (Request $request) {
    $credentials = $request->validate([
        'matricule' => 'required|string',
        'password' => 'required|string',
    ]);

    $user = Utilisateur::where('matricule', $credentials['matricule'])->first();

    if (!$user || !Hash::check($credentials['password'], $user->password)) {
        return response()->json(['error' => 'Identifiants invalides'], 401);
    }

    return response()->json([
        'message' => 'Connexion réussie',
        'utilisateur' => $user,
    ]);
});

// 📦 CRUD API for Utilisateur (used by mobile app)
Route::get('/utilisateur', [UtilisateurController::class, 'index']);
Route::post('/utilisateur', [UtilisateurController::class, 'saveutilisateur']);
Route::get('/utilisateur/{id}', [UtilisateurController::class, 'edit']);
Route::put('/utilisateur/{id}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateur/{id}', [UtilisateurController::class, 'destroy']);
