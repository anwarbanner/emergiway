<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Hash;

class UtilisateurController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $utilisateurs = Utilisateur::when($search, function ($query) use ($search) {
            return $query->where('nom', 'like', "%{$search}%")
                         ->orWhere('matricule', 'like', "%{$search}%");
        })->get();

        if ($request->wantsJson()) {
            return response()->json(['data' => $utilisateurs], 200);
        }

        return view('utilisateurs.index', compact('utilisateurs'));
    }

    public function create(Request $request)
    {
        if ($request->wantsJson()) {
            return response()->json(['message' => 'Form display not available via API'], 400);
        }

        return view('utilisateurs.create');
    }

    public function saveutilisateur(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'matricule' => 'required|string|max:20|unique:utilisateurs,matricule',
            'telephone' => 'required|numeric',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $data['password'] = Hash::make($data['password']);
        $utilisateur = Utilisateur::create($data);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Utilisateur créé avec succès', 'data' => $utilisateur], 201);
        }

        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur ajouté avec succès.');
    }

    public function destroy(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
        }

        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur supprimé avec succès.');
    }

    public function edit(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);

        if ($request->wantsJson()) {
            return response()->json(['data' => $utilisateur], 200);
        }

        return view('utilisateurs.edit', compact('utilisateur'));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'matricule' => 'required|string|max:20|unique:utilisateurs,matricule,' . $id,
            'telephone' => 'required|integer',
            'date_naissance' => 'required|date',
            'travail' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $utilisateur = Utilisateur::findOrFail($id);

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $utilisateur->update($data);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Utilisateur mis à jour avec succès', 'data' => $utilisateur], 200);
        }

        return redirect()->route('utilisateur.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }
}
