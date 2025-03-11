<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class utilisateur extends Authenticatable
{
    use Notifiable;

    protected $table = 'utilisateur';

    protected $fillable = [
        'nom',
        'prenom',
        'cin',
        'telephone',
        'date_naissance',
        'travail',
        'email',
        'password'
    ];

   
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
