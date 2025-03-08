<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifier un utilisateur</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Modifier un utilisateur</h2>

        <form action="{{ route('utilisateur.update', $utilisateur->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" name="nom" value="{{ $utilisateur->nom }}" required>
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" name="prenom" value="{{ $utilisateur->prenom }}" required>
            </div>
            <div class="mb-3">
                <label for="cin" class="form-label">CIN</label>
                <input type="text" class="form-control" id="cin" name="cin" value="{{ $utilisateur->cin }}" required>
            </div>
            <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" name="telephone" value="{{ $utilisateur->telephone }}" required>
            </div>
            <div class="mb-3">
                <label for="date_naissance" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="date_naissance" name="date_naissance" value="{{ $utilisateur->date_naissance }}" required>
            </div>
            <div class="mb-3">
                <label for="travail" class="form-label">Travail</label>
                <input type="text" class="form-control" id="travail" name="travail" value="{{ $utilisateur->travail }}">
            </div>

            <button type="submit" class="btn btn-primary">Mettre à jour</button>
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
