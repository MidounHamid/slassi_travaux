<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name',
        'role_fr',
        'role_ar',
        'role_en',
        'company_fr',
        'company_ar',
        'company_en',
        'city_fr',
        'city_ar',
        'city_en',
        'comment_fr',
        'comment_ar',
        'comment_en',
        'rating',
        'avatar_image',
        'project_id',
        'order',
        'is_published',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_published' => 'boolean',
        'order' => 'integer',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->id,
            'name' => $this->client_name,
            'role' => match ($lang) {
                'ar' => $this->role_ar ?: $this->role_fr,
                'en' => $this->role_en ?: $this->role_fr,
                default => $this->role_fr,
            },
            'company' => match ($lang) {
                'ar' => $this->company_ar ?: $this->company_fr,
                'en' => $this->company_en ?: $this->company_fr,
                default => $this->company_fr,
            },
            'city' => match ($lang) {
                'ar' => $this->city_ar ?: $this->city_fr,
                'en' => $this->city_en ?: $this->city_fr,
                default => $this->city_fr,
            },
            'comment' => match ($lang) {
                'ar' => $this->comment_ar ?: $this->comment_fr,
                'en' => $this->comment_en ?: $this->comment_fr,
                default => $this->comment_fr,
            },
            'rating' => $this->rating,
            'avatar' => $this->avatar_image,
        ];
    }
}

