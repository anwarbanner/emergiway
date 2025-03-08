<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class utilisateur extends Model
{
    //
    protected $table = 'utilisateur';

    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'telephone',
        'date_naissance',
        'travail'
    ];
}
