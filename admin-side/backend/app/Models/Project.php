<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title_fr',
        'title_ar',
        'title_en',
        'category',
        'category_label_fr',
        'category_label_ar',
        'category_label_en',
        'location_fr',
        'location_ar',
        'location_en',
        'client_fr',
        'client_ar',
        'client_en',
        'year',
        'area',
        'budget',
        'progress',
        'status',
        'image',
        'description_fr',
        'description_ar',
        'description_en',
    ];

    protected $casts = [
        'progress' => 'integer',
    ];

    protected $appends = [
        'title',
        'location',
        'client',
        'category_label',
        'description',
    ];

    public function highlights(): HasMany
    {
        return $this->hasMany(ProjectHighlight::class)->orderBy('order');
    }

    public function machineries(): HasMany
    {
        return $this->hasMany(Machinery::class);
    }

    // Accessors for easy frontend consumption
    public function getTitleAttribute(): array
    {
        return [
            'fr' => $this->title_fr,
            'ar' => $this->title_ar ?: $this->title_fr,
            'en' => $this->title_en ?: $this->title_fr,
        ];
    }

    public function getLocationAttribute(): array
    {
        return [
            'fr' => $this->location_fr,
            'ar' => $this->location_ar ?: $this->location_fr,
            'en' => $this->location_en ?: $this->location_fr,
        ];
    }

    public function getClientAttribute(): array
    {
        return [
            'fr' => $this->client_fr,
            'ar' => $this->client_ar ?: $this->client_fr,
            'en' => $this->client_en ?: $this->client_fr,
        ];
    }

    public function getCategoryLabelAttribute(): array
    {
        return [
            'fr' => $this->category_label_fr ?: $this->category,
            'ar' => $this->category_label_ar ?: ($this->category_label_fr ?: $this->category),
            'en' => $this->category_label_en ?: ($this->category_label_fr ?: $this->category),
        ];
    }

    public function getDescriptionAttribute(): array
    {
        return [
            'fr' => $this->description_fr ?: '',
            'ar' => $this->description_ar ?: ($this->description_fr ?: ''),
            'en' => $this->description_en ?: ($this->description_fr ?: ''),
        ];
    }

    // Format for client-side API
    public function toClientFormat(): array
    {
        return [
            'id' => $this->slug,
            'db_id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'categoryLabel' => $this->category_label,
            'location' => $this->location,
            'client' => $this->client,
            'year' => $this->year,
            'area' => $this->area ?: '',
            'status' => $this->status === 'done' ? 'done' : 'ongoing',
            'image' => $this->image ?: '/images/project-residential.jpg',
            'budget' => $this->budget,
            'description' => $this->description,
            'highlights' => $this->highlights->map(fn($h) => [
                'fr' => $h->text_fr,
                'ar' => $h->text_ar ?: $h->text_fr,
                'en' => $h->text_en ?: $h->text_fr,
            ])->values()->all(),
        ];
    }

    // Format for admin-side API
    public function toAdminFormat(): array
    {
        return [
            'id' => 'proj-' . $this->id,
            'db_id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title_fr,
            'category' => $this->category,
            'client' => $this->client_fr,
            'location' => $this->location_fr,
            'budget' => $this->budget,
            'status' => $this->status,
            'progress' => $this->progress,
            'date' => $this->year,
            'image' => $this->image,
        ];
    }
}
