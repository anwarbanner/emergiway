<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    //dd('Redirection vers utilisateur'); // Test pour voir si cette ligne est exécutée
    return redirect()->route('utilisateur.index'); 
})->middleware(['auth', 'verified'])->name('dashboard');


// Routes pour l'authentification (si tu les utilises avec Breeze ou Jetstream)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/utilisateur', [UtilisateurController::class, 'index'])->name('utilisateur.index');
    Route::get('/utilisateur/create', [UtilisateurController::class, 'create'])->name('utilisateur.create');
    Route::post('/utilisateur', [UtilisateurController::class, 'saveutilisateur'])->name('utilisateur.saveutilisateur');
    Route::get('/utilisateur/{id}/edit', [UtilisateurController::class, 'edit'])->name('utilisateur.edit');
    Route::put('/utilisateur/{id}', [UtilisateurController::class, 'update'])->name('utilisateur.update');
    Route::delete('/utilisateur/{id}', [UtilisateurController::class, 'destroy'])->name('utilisateur.destroy');
});

require __DIR__ . '/auth.php';