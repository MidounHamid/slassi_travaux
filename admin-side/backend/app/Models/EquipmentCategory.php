<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EquipmentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_fr',
        'title_ar',
        'title_en',
        'icon',
        'banner_image',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(EquipmentCategoryItem::class)->orderBy('order');
    }

    public function toClientFormat(string $lang = 'fr'): array
    {
        return [
            'id' => $this->slug,
            'title' => match ($lang) {
                'ar' => $this->title_ar ?: $this->title_fr,
                'en' => $this->title_en ?: $this->title_fr,
                default => $this->title_fr,
            },
            'icon' => $this->icon,
            'bannerImage' => $this->banner_image,
            'items' => $this->items->map(function ($it) use ($lang) {
                if ($lang === 'ar') return $it->name_ar ?: $it->name_fr;
                if ($lang === 'en') return $it->name_en ?: $it->name_fr;
                return $it->name_fr;
            })->toArray(),
        ];
    }
}

