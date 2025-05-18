<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up()
    {
        // For SQLite compatibility, we need to use a different approach
        if (DB::connection()->getDriverName() === 'sqlite') {
            // First drop any existing temporary tables from previous migration attempts
            Schema::dropIfExists('utilisateur_new');
            Schema::dropIfExists('utilisateur_old');
            
            // Create a new table with the desired structure
            Schema::create('utilisateur_new', function (Blueprint $table) {
                $table->id();
                $table->string('nom');
                $table->string('matricule')->unique();
                $table->string('travail');
                $table->timestamps();
            });
            
            // Copy data from the old table to the new one
            DB::statement('INSERT INTO utilisateur_new (id, nom, travail, created_at, updated_at) 
                           SELECT id, nom, travail, created_at, updated_at FROM utilisateur');
            
            // Drop the old table
            Schema::drop('utilisateur');
            
            // Rename the new table to the original name
            Schema::rename('utilisateur_new', 'utilisateur');
        } else {
            // For other databases, use the standard approach
            Schema::table('utilisateur', function (Blueprint $table) {
                $table->dropColumn('prenom'); 
                $table->dropColumn('cin'); 
                $table->dropColumn('email'); 
                $table->string('matricule')->unique()->after('nom'); 
            });
        }
    }

    public function down()
    {
        // For SQLite compatibility, we need to use a different approach
        if (DB::connection()->getDriverName() === 'sqlite') {
            // First drop any existing temporary tables from previous migration attempts
            Schema::dropIfExists('utilisateur_new');
            Schema::dropIfExists('utilisateur_old');
            
            // Create a new table with the previous structure
            Schema::create('utilisateur_old', function (Blueprint $table) {
                $table->id();
                $table->string('nom');
                $table->string('prenom');
                $table->string('cin')->unique();
                $table->string('travail');
                $table->string('email')->unique();
                $table->timestamps();
            });
            
            // Copy data from the current table to the old structure
            DB::statement('INSERT INTO utilisateur_old (id, nom, travail, created_at, updated_at) 
                           SELECT id, nom, travail, created_at, updated_at FROM utilisateur');
            
            // Drop the current table
            Schema::drop('utilisateur');
            
            // Rename the old structure table to the original name
            Schema::rename('utilisateur_old', 'utilisateur');
            
            // Add default values for the restored columns
            DB::table('utilisateur')->update([
                'prenom' => '',
                'cin' => DB::raw('id'),  // Using ID as a temporary unique value
                'email' => DB::raw('"user_" || id || "@example.com"')  // Creating a unique email
            ]);
        } else {
            // For other databases, use the standard approach
            Schema::table('utilisateur', function (Blueprint $table) {
                $table->string('prenom')->after('nom'); 
                $table->string('cin')->unique()->after('prenom'); 
                $table->string('email')->unique()->after('travail'); 
                $table->dropColumn('matricule'); 
            });
        }
    }
};
