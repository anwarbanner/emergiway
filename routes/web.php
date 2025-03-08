<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/utilisateur', [UtilisateurController::class, 'index'])->name('utilisateur.index');
Route::get('/utilisateur/create', [UtilisateurController::class, 'create'])->name('utilisateur.create');
Route::post('/utilisateur', [UtilisateurController::class, 'saveutilisateur'])->name('utilisateur.saveutilisateur');
Route::get('/utilisateur/{id}/edit', [UtilisateurController::class, 'edit'])->name('utilisateur.edit');
Route::put('/utilisateur/{id}', [UtilisateurController::class, 'update'])->name('utilisateur.update');
Route::delete('/utilisateur/{id}', [UtilisateurController::class, 'destroy'])->name('utilisateur.destroy');
