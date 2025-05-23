<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('utilisateur', function (Blueprint $table) {
            $table->string('email')->unique();
            $table->string('password');
        });
    }

    public function down()
    {
        Schema::table('utilisateur', function (Blueprint $table) {
            $table->dropColumn(['email', 'password']);
        });
    }
};

