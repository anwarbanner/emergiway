<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\utilisateur;

class UtilisateurController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
    
        $utilisateurs = Utilisateur::when($search, function ($query) use ($search) {
            return $query->where('nom', 'like', "%{$search}%")
                         ->orWhere('matricule', 'like', "%{$search}%");
        })->get();
    
        return view('utilisateurs.index', compact('utilisateurs'));
    }
    
    public function create(){
        return view('utilisateurs.create');
    }
    public function saveutilisateur(Request $request) {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'matricule' => 'required|string|max:20|unique:utilisateurs,matricule',
            'telephone' => 'required|numeric',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
           
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
            'matricule' => 'required|string|max:20|unique:utilisateurs,matricule,' . $id,
            'telephone' => 'required|integer',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255',
            
        ]);
    
        $utilisateur = utilisateur::findOrFail($id);  
        $utilisateur->update($data);  
    
        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }
    
    
    
    
}
