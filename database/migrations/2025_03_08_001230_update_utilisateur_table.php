<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('utilisateur', function (Blueprint $table) {
        $table->renameColumn('date de naissance', 'date_naissance');  // Renommage de la colonne
        // Si tu veux ajouter ou modifier d'autres colonnes, fais-le ici.
    });
}

public function down()
{
    Schema::table('utilisateur', function (Blueprint $table) {
        $table->renameColumn('date_naissance', 'date de naissance'); // Annulation du renommage
    });
}

};
