<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class utilisateur extends Authenticatable
{
    use Notifiable;

    protected $table = 'utilisateurs';


    protected $fillable = [
        'nom',
        'matricule',
        'telephone',
        'date_naissance',
        'travail',
        'password',
        
    ];

   
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
