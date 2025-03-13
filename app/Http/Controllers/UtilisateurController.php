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
    public function update(Request $request, $id)
    {
        // Validation des données
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'cin' => 'required|string|max:20|unique:utilisateur,cin,' . (int)$id,
            'telephone' => 'required|regex:/^\+?[0-9\s\-\(\)]*$/',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255',
            'email' => 'required|email|unique:utilisateur,email,' . (int)$id,
            'password' => 'nullable|string|min:8|confirmed'
        ]);
    
        // Trouver l'utilisateur à mettre à jour
        $user = Utilisateur::findOrFail($id);
    
        // Si le mot de passe est fourni, on le hashe avant de le sauvegarder
        if ($request->has('password') && !empty($request->password)) {
            $data['password'] = bcrypt($request->password);
        } else {
            // Si le mot de passe n'est pas fourni, ne pas changer l'ancien mot de passe
            unset($data['password']);
        }
    
        // Mettre à jour les données de l'utilisateur
        $user->update($data);
    
        // Rediriger ou retourner une réponse
        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }
    

       
    
    
    
    
}
