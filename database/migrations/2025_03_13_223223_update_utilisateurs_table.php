<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('utilisateur', function (Blueprint $table) {
            $table->dropColumn('prenom'); 
            $table->dropColumn('cin'); 
            $table->dropColumn('email'); 
            $table->string('matricule')->unique()->after('nom'); 
           
        });
    }

    public function down()
    {
        Schema::table('utilisateur', function (Blueprint $table) {
            $table->string('prenom')->after('nom'); 
            $table->string('cin')->unique()->after('prenom'); 
            $table->string('email')->unique()->after('travail'); 
            $table->dropColumn('matricule'); 
           
        });
    }
};
