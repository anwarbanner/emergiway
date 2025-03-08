<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('utilisateur', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('cin');
            $table->integer('telephone');
            $table->date('date_naissance');
            $table->string('travail');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
        Schema::table('utilisateur', function (Blueprint $table) {
            $table->renameColumn('date_naissance', 'date de naissance'); // Annulation du renommage
        });
    }
};
