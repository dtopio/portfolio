<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = 'profile';

    protected $fillable = [
        'bio',
        'location',
        'tagline',
        'summary',
        'stack',
        'cv',
        'cv_filename',
        'cv_uploaded_at',
    ];

    protected $casts = [
        'stack' => 'array',
        'cv_uploaded_at' => 'datetime',
    ];

    public static function current(): self
    {
        return static::query()->firstOrCreate([]);
    }
}
