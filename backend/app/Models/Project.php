<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'tech_stack',
        'tags',
        'github_url',
        'demo_url',
        'image',
        'featured',
        'sort_order',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'tags' => 'array',
        'featured' => 'boolean',
    ];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderByDesc('featured')->orderBy('sort_order');
    }
}
