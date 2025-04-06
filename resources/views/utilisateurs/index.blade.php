<!DOCTYPE html>
<html lang="fr">
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

        <!-- Success message for API and web -->
        @if(session('success'))
            <div id="success-message" class="alert alert-success">
                {{ session('success') }}
            </div>
        @else
            <div id="success-message" class="alert alert-success d-none"></div>
        @endif

        <!-- Search Form -->
        <form id="search-form" class="mb-3">
            <div class="input-group">
                <input type="text" id="search" class="form-control" placeholder="Rechercher par nom ou matricule">
                <button type="submit" class="btn btn-primary">Rechercher</button>
            </div>
        </form>

        <!-- Table of Users -->
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Matricule</th>
                    <th>Téléphone</th>
                    <th>Date de naissance</th>
                    <th>Travail</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="user-table-body">
                <!-- Les utilisateurs seront affichés ici -->
                @foreach ($utilisateurs as $utilisateur)
                    <tr>
                        <td>{{ $utilisateur->nom }}</td>
                        <td>{{ $utilisateur->matricule }}</td>
                        <td>{{ $utilisateur->telephone }}</td>
                        <td>{{ $utilisateur->date_naissance }}</td>
                        <td>{{ $utilisateur->travail }}</td>
                        <td>
                            <a href="{{ route('utilisateur.edit', $utilisateur->id) }}" class="btn btn-warning">Modifier</a>
                            <form action="{{ route('utilisateur.destroy', $utilisateur->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Voulez-vous vraiment supprimer cet utilisateur ?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <a href="{{ route('utilisateur.create') }}" class="btn btn-primary">Créer un utilisateur</a>
    </div>
    
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const userTableBody = document.getElementById("user-table-body");
            const searchForm = document.getElementById("search-form");
            const searchInput = document.getElementById("search");
            const successMessage = document.getElementById("success-message");
            
            // Fetch users for API
            function fetchUsers(query = "") {
                fetch(`/api/utilisateur?search=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        userTableBody.innerHTML = "";
                        data.forEach(user => {
                            const row = `<tr>
                                <td>${user.nom}</td>
                                <td>${user.matricule}</td>
                                <td>${user.telephone}</td>
                                <td>${user.date_naissance}</td>
                                <td>${user.travail}</td>
                                <td>
                                    <a href="edit.html?id=${user.id}" class="btn btn-warning">Modifier</a>
                                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Supprimer</button>
                                </td>
                            </tr>`;
                            userTableBody.innerHTML += row;
                        });
                    })
                    .catch(error => console.error("Erreur lors du chargement des utilisateurs :", error));
            }

            // Delete User using API
            function deleteUser(id) {
                if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
                    fetch(`/api/utilisateur/${id}`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" }
                    })
                    .then(response => {
                        if (response.ok) {
                            successMessage.textContent = "Utilisateur supprimé avec succès";
                            successMessage.classList.remove("d-none");
                            fetchUsers(); // Refresh list
                        }
                    })
                    .catch(error => console.error("Erreur lors de la suppression :", error));
                }
            }

            // Handle Search Form submission (API)
            searchForm.addEventListener("submit", function (event) {
                event.preventDefault();
                fetchUsers(searchInput.value);
            });
            
            fetchUsers(); // Initial load
        });
    </script>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
