<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un utilisateur</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <div class="container mt-5">
        <h2 class="mb-4">Ajouter un utilisateur</h2>

        <div id="error-message" class="alert alert-danger" style="display: none;">
            <ul id="error-list"></ul>
        </div>

        <form id="user-form" method="POST" action="{{ route('utilisateur.saveutilisateur') }}">  <!-- Web route -->
            @csrf  <!-- Include CSRF token for web requests -->

            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" name="nom" required>
            </div>

            <div class="mb-3">
                <label for="matricule" class="form-label">Matricule</label>
                <input type="text" class="form-control" id="matricule" name="matricule" required>
            </div>

            <div class="mb-3">
                <label for="telephone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="telephone" name="telephone" required>
            </div>

            <div class="mb-3">
                <label for="date_naissance" class="form-label">Date de mise en circulation</label>
                <input type="date" class="form-control" id="date_naissance" name="date_naissance" required>
            </div>

            <div class="mb-3">
                <label for="travail" class="form-label">Fonctionnalité du véhicule</label>
                <input type="text" class="form-control" id="travail" name="travail">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>

            <div class="mb-3">
                <label for="password_confirmation" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" required>
            </div>

            <button type="submit" class="btn btn-primary">Envoyer</button>
            <a href="{{ route('utilisateur.index') }}" class="btn btn-secondary">Annuler</a>
        </form>

    </div>

    <script>
        document.getElementById('user-form').addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission

            // Collect form data for API submission (only if it's an API request)
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Check if the form should submit via API or Web
            const isApiRequest = window.location.pathname.includes("/api/");

            if (isApiRequest) {
                // Handle API submission with Axios
                axios.post('/api/utilisateurs', data)
                    .then(function (response) {
                        alert('Utilisateur ajouté avec succès');
                        window.location.href = '{{ route("utilisateur.index") }}'; // Redirect to user list
                    })
                    .catch(function (error) {
                        // Handle validation errors for API
                        if (error.response && error.response.status === 422) {
                            const errorMessages = error.response.data.errors;
                            const errorList = document.getElementById('error-list');
                            errorList.innerHTML = ''; // Clear previous error messages
                            for (let field in errorMessages) {
                                errorMessages[field].forEach(function (message) {
                                    const listItem = document.createElement('li');
                                    listItem.textContent = message;
                                    errorList.appendChild(listItem);
                                });
                            }
                            document.getElementById('error-message').style.display = 'block';
                        } else {
                            alert('Une erreur est survenue. Veuillez réessayer.');
                        }
                    });
            } else {
                // Handle Web submission (no need for axios, just submit the form as usual)
                this.submit(); // This will let the form submit to the web route
            }
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
