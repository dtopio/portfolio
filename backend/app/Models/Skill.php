<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'level',
        'icon',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('category')->orderBy('sort_order');
    }
}
