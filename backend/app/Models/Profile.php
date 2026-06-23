<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profile';

    protected $fillable = [
        'bio',
        'location',
    ];

    public static function current(): self
    {
        return static::query()->firstOrCreate([]);
    }
}
