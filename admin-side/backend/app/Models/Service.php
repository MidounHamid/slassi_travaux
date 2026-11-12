<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_fr',
        'title_ar',
        'title_en',
        'short_desc_fr',
        'short_desc_ar',
        'short_desc_en',
        'icon',
        'image',
        'advantage_title_fr',
        'advantage_title_ar',
        'advantage_title_en',
        'advantage_desc_fr',
        'advantage_desc_ar',
        'advantage_desc_en',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function scopes(): HasMany
    {
        return $this->hasMany(ServiceScope::class)->orderBy('order');
    }

    // Format for client-side consumption
    public function toClientFormat(string $lang = 'fr'): array
    {
        $scopeList = $this->scopes->map(function ($s) use ($lang) {
            if ($lang === 'ar') return $s->text_ar ?: $s->text_fr;
            if ($lang === 'en') return $s->text_en ?: $s->text_fr;
            return $s->text_fr;
        })->toArray();

        $advantageTitle = match ($lang) {
            'ar' => $this->advantage_title_ar ?: $this->advantage_title_fr,
            'en' => $this->advantage_title_en ?: $this->advantage_title_fr,
            default => $this->advantage_title_fr,
        };

        $advantageDesc = match ($lang) {
            'ar' => $this->advantage_desc_ar ?: $this->advantage_desc_fr,
            'en' => $this->advantage_desc_en ?: $this->advantage_desc_fr,
            default => $this->advantage_desc_fr,
        };

        return [
            'id' => $this->slug,
            'title' => match ($lang) {
                'ar' => $this->title_ar ?: $this->title_fr,
                'en' => $this->title_en ?: $this->title_fr,
                default => $this->title_fr,
            },
            'shortDesc' => match ($lang) {
                'ar' => $this->short_desc_ar ?: $this->short_desc_fr,
                'en' => $this->short_desc_en ?: $this->short_desc_fr,
                default => $this->short_desc_fr,
            },
            'icon' => $this->icon,
            'image' => $this->image,
            'scope' => $scopeList,
            'advantage' => trim("{$advantageTitle} : {$advantageDesc}"),
            'advantageTitle' => $advantageTitle,
            'advantageDesc' => $advantageDesc,
        ];
    }
}

