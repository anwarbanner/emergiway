<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Utilisateurs</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
@include('utilisateurs.navbar')
    <div class="container mt-5">
        <h2>Liste des utilisateurs</h2>

        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>CIN</th>
                    <th>Téléphone</th>
                    <th>Date de naissance</th>
                    <th>Travail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($utilisateurs as $utilisateur)
                    <tr>
                        <td>{{ $utilisateur->nom }}</td>
                        <td>{{ $utilisateur->prenom }}</td>
                        <td>{{ $utilisateur->cin }}</td>
                        <td>{{ $utilisateur->telephone }}</td>
                        <td>{{ $utilisateur->date_naissance }}</td>
                        <td>{{ $utilisateur->travail }}</td>
                        <td>
                           
                            <a href="{{ route('utilisateur.edit', $utilisateur->id) }}" class="btn btn-warning">Modifier</a>

                           
                            <form action="{{ route('utilisateur.destroy', $utilisateur->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Supprimer</button>
                            </form>

                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <a href="{{ route('utilisateur.create') }}" class="btn btn-primary">create</a>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
