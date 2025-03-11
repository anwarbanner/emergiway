<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\utilisateur;

class UtilisateurController extends Controller
{
    public function index() {
        $utilisateurs = utilisateur::all(); 
        return view('utilisateurs.index', compact('utilisateurs'));  
    }
    
    public function create(){
        return view('utilisateurs.create');
    }
    public function saveutilisateur(Request $request) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'cin' => 'required|string|max:20|unique:utilisateur,cin',
            'telephone' => 'required|numeric',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255',
            'email' => 'required|email|unique:utilisateur,email',
            'password' => 'required|string|min:8|confirmed'
        ]);
        Utilisateur::create($data); 
    
        return redirect(route('utilisateur.index'))->with('success', 'Personne ajoutée avec succès.');
    }
    public function destroy($id) {
        $utilisateur = utilisateur::findOrFail($id);  
        $utilisateur->delete();  
    
        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur supprimé avec succès.');
    }
    public function edit($id) {
        $utilisateur = utilisateur::findOrFail($id);  
        return view('utilisateurs.edit', compact('utilisateur'));  
    }
    public function update(Request $request, $id) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'cin' => 'required|string|max:20|unique:utilisateur,cin,' . $id,
            'telephone' => 'required|integer',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255'
        ]);
    
        $utilisateur = utilisateur::findOrFail($id);  
        $utilisateur->update($data);  
    
        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }
    
    
    
    
}
