<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commitment extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_fr',
        'title_ar',
        'title_en',
        'desc_fr',
        'desc_ar',
        'desc_en',
        'icon',
        'image',
        'badge_fr',
        'badge_ar',
        'badge_en',
        'standard_code',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->id,
            'title' => match ($lang) {
                'ar' => $this->title_ar ?: $this->title_fr,
                'en' => $this->title_en ?: $this->title_fr,
                default => $this->title_fr,
            },
            'desc' => match ($lang) {
                'ar' => $this->desc_ar ?: $this->desc_fr,
                'en' => $this->desc_en ?: $this->desc_fr,
                default => $this->desc_fr,
            },
            'icon' => $this->icon,
            'image' => $this->image,
            'badge' => match ($lang) {
                'ar' => $this->badge_ar ?: $this->badge_fr,
                'en' => $this->badge_en ?: $this->badge_fr,
                default => $this->badge_fr,
            },
            'standardCode' => $this->standard_code,
        ];
    }
}

